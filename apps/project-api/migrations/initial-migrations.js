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

      // Tax return

      await queryInterface.createTable(
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
              key: 'national_id',
            },
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

      // Add the composite primary key using raw SQL
      await queryInterface.sequelize.query(
        `
        ALTER TABLE tax_return
        ADD CONSTRAINT pk_tax_return PRIMARY KEY (year, person_id);
        `,
        { transaction: t },
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
      await queryInterface.sequelize.query(
        `
        ALTER TABLE income
        ADD CONSTRAINT fk_income_tax_return
        FOREIGN KEY (year, person_id)
        REFERENCES tax_return (year, person_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE;
        `,
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
          }, // TODO: can also add a payer with reference to th_person
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
      await queryInterface.dropTable('income_lines', { transaction: t })
      await queryInterface.dropTable('income', { transaction: t })
      await queryInterface.dropTable('tax_return', { transaction: t })
      await queryInterface.dropTable('th_people', { transaction: t })
      await queryInterface.dropTable('th_address', { transaction: t })
      await queryInterface.dropTable('income_types', { transaction: t })
    })
  },
}
