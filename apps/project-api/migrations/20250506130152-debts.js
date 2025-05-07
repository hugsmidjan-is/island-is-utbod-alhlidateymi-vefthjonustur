'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'debt_types',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
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
        'debt',
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
        'debt_lines',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          debt_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'debt',
              key: 'id',
            },
          },
          debt_type_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'debt_types',
              key: 'id',
            },
          },
          term: {
            type: Sequelize.INTEGER,
          },
          origination_date: {
            type: Sequelize.DATEONLY,
          },
          identifier: {
            type: Sequelize.STRING,
          },
          label: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          outstanding_principal: {
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          interest_amount: {
            type: Sequelize.FLOAT,
          },
          annual_total_payment: {
            type: Sequelize.FLOAT,
          },
          annual_total_principal_payment: {
            type: Sequelize.FLOAT,
          },
          creditor_id: {
            type: Sequelize.STRING,
          },
          creditor_name: {
            type: Sequelize.STRING,
          },
          write_down: {
            type: Sequelize.FLOAT,
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

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('debt_lines', { transaction: t })
      await queryInterface.dropTable('debt', { transaction: t })
      await queryInterface.dropTable('debt_types', { transaction: t })
    })
  },
}
