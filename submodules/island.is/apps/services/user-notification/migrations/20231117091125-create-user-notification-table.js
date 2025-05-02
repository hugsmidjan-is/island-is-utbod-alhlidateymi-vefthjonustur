'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_notification', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      message_id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      recipient: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      template_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      args: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status: {
        type: Sequelize.ENUM('read', 'unread'),
        defaultValue: 'unread',
        allowNull: false,
      },
    })

    await queryInterface.addIndex('user_notification', ['recipient']) // Adding index
    await queryInterface.addIndex('user_notification', ['message_id']) // Adding index
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user_notification')
  },
}
