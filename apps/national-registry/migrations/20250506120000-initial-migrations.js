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
          postal_code: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          city: {
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
          national_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phonenumber: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          type: {
            type: Sequelize.ENUM('person', 'legal_entity'),
          },
          address_id: {
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
    })
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('th_people', { transaction: t })
      await queryInterface.dropTable('th_address', { transaction: t })
    })
  },
}
