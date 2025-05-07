'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      // Tax return
      await queryInterface.createTable(
        'tax_return',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          created: {
            type: 'TIMESTAMP WITH TIME ZONE',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          modified: {
            type: 'TIMESTAMP WITH TIME ZONE',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: 'SET DEFAULT',
            allowNull: false,
          },
          year: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          person_id: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          type: {
            type: Sequelize.ENUM('prefill', 'submit'),
            allowNull: false,
          },
          submitted_at: {
            type: 'TIMESTAMP WITH TIME ZONE',
            allowNull: true,
            defaultValue: null,
          },
        },
        {
          indexes: [
            {
              unique: true,
              fields: ['year', 'national_id'],
            },
          ],
          transaction: t,
        },
      )

      // Income
      await queryInterface.createTable(
        'income_types',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          code: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        },
        {
          transaction: t,
        },
      )

      await queryInterface.createTable(
        'income',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          created: {
            type: 'TIMESTAMP WITH TIME ZONE',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          modified: {
            type: 'TIMESTAMP WITH TIME ZONE',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          type: {
            type: Sequelize.ENUM('prefill', 'submit'),
            allowNull: false,
          },
          tax_return_id: {
            type: Sequelize.UUID,
            references: {
              model: 'tax_return',
              key: 'id',
            },
          },
        },
        { transaction: t },
      )

      await queryInterface.createTable(
        'income_lines',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          income_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'income',
              key: 'id',
            },
          },
          income_type_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'income_types',
              key: 'id',
            },
          },
          label: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          payer: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
          },
          value: {
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          currency: {
            type: Sequelize.STRING,
            defaultValue: 'ISK',
          },
        },
        { transaction: t },
      )
    })
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query(
        `
        ALTER TABLE IF EXISTS debt
        DROP CONSTRAINT debt_tax_return_id_fkey;
        `,
        { transaction: t },
      )
      await queryInterface.sequelize.query(
        `
        ALTER TABLE IF EXISTS debt_lines
        DROP CONSTRAINT debt_lines_creditor_id_fkey;
        `,
        { transaction: t },
      )
      await queryInterface.dropTable('income_lines', { transaction: t })
      await queryInterface.dropTable('income', { transaction: t })
      await queryInterface.dropTable('tax_return', { transaction: t })
      await queryInterface.dropTable('income_types', { transaction: t })
    })
  },
}
