'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'property_types',
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
        'property',
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
        'property_lines',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          property_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'property',
              key: 'id',
            },
          },
          label: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          identifier: {
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
          property_type_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'property_types',
              key: 'id',
            },
          },
          //TODO: should there be an optional reference to an address?
        },
        { transaction: t },
      )
    })
  },
  down: (queryInterface) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('property_lines', { transaction: t })
      await queryInterface.dropTable('property', { transaction: t })
      await queryInterface.dropTable('property_types', { transaction: t })
    })
  },
}
