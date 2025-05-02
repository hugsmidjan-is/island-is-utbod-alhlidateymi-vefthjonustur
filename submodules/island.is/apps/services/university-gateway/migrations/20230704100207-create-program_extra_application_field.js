'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) =>
      queryInterface.createTable(
        'program_extra_application_field',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
          },
          program_id: {
            type: Sequelize.UUID,
            references: {
              model: 'program',
              key: 'id',
            },
            allowNull: false,
          },
          external_id: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          name_is: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          name_en: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description_is: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          description_en: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          required: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
          },
          field_type: {
            type: Sequelize.ENUM(
              'UPLOAD',
              'CHECKBOX',
              'TEXT_INPUT',
              'TEXT_AREA',
              'DROPDOWN',
              'DATA_PROVIDER',
              'APPROVAL_PROVIDER',
              'TESTING_SITE',
            ),
            allowNull: false,
          },
          upload_accepted_file_type: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          options: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          created: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          modified: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        },
        { transaction: t },
      ),
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) =>
      queryInterface.dropTable('program_extra_application_field', {
        transaction: t,
      }),
    )
  },
}
