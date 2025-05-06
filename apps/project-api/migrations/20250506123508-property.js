'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      // Properties

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
          property_type_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'property_types',
              key: 'id',
            },
          },
          // year + person_id used as composite foreign key
          year: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          person_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        },
        { transaction: t },
      )

      // Sequelize does not natively support composite foreign keys
      // we use a query to add it
      // await queryInterface.sequelize.query(
      //   `
      //   ALTER TABLE property
      //   ADD CONSTRAINT fk_property_tax_return
      //   FOREIGN KEY (year, person_id)
      //   REFERENCES tax_return (year, person_id)
      //   ON UPDATE CASCADE
      //   ON DELETE CASCADE;
      //   `,
      //   { transaction: t },
      // )

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
          property_type_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'property_types',
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
      await queryInterface.dropTable('property_lines', { transaction: t })
      await queryInterface.dropTable('property', { transaction: t })
      await queryInterface.dropTable('property_types', { transaction: t })
    })
  },
}
