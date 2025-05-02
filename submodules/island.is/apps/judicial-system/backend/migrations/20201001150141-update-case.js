'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'case',
          'prosecutor_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'user',
              key: 'id',
            },
            allowNull: true,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'case',
          'judge_id',
          {
            type: Sequelize.UUID,
            references: {
              model: 'user',
              key: 'id',
            },
            allowNull: true,
          },
          { transaction: t },
        ),
      ]),
    )
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('case', 'prosecutor_id', {
          transaction: t,
        }),
        queryInterface.removeColumn('case', 'judge_id', {
          transaction: t,
        }),
      ]),
    )
  },
}
