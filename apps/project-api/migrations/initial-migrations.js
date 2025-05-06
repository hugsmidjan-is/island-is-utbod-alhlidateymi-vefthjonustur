'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'th_address',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          address: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        },
        {
          transaction: t,
        },
      )

      await queryInterface.createTable(
        'th_people',
        {
          nationalId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          type: {
            type: Sequelize.ENUM('person', 'legal_entity'),
          },
          residence_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'th_address',
              key: 'id',
            },
          },
        },
        {
          transaction: t,
        },
      )

      queryInterface.createTable(
        'tax_return',
        {
          year: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          person_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'th_people',
              key: 'nationalId',
            },
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        },
        {
          transaction: t,
          primaryKeys: ['year', 'person_id'],
        },
      )

      await queryInterface.createTable(
        'income_types',
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
          income_type_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'income_types',
              key: 'id',
            },
          },
          payer: {
            type: Sequelize.STRING, // TODO: setja upp sér töflu og vensla?
            allowNull: false,
          },
          value: {
            type: Sequelize.FLOAT,
            allowNull: false,
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
            allowNull: false,
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
      await queryInterface.dropTable('tax_return', { transaction: t })
      await queryInterface.dropTable('th_people', { transaction: t })
      await queryInterface.dropTable('th_address', { transaction: t })
      await queryInterface.dropTable('income_lines', { transaction: t })
      await queryInterface.dropTable('income', { transaction: t })
      await queryInterface.dropTable('income_types', { transaction: t })
    })
  },
}
