'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) =>
      queryInterface
        .addColumn(
          'staff',
          'municipality_ids',
          {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: [],
            allowNull: false,
          },
          { transaction: t },
        )
        .then(() =>
          queryInterface.sequelize.query(
            'UPDATE "staff"\
            SET "municipality_ids" = ARRAY["municipality_id"]',
            { transaction: t },
          ),
        )
        .then(() =>
          queryInterface.removeColumn('staff', 'municipality_id', {
            transaction: t,
          }),
        ),
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) =>
      queryInterface
        .addColumn(
          'staff',
          'municipality_id',
          {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false,
          },
          { transaction: t },
        )
        .then(() =>
          queryInterface.sequelize.query(
            'UPDATE "staff"\
            SET "municipality_id" = "municipality_ids"[1] \
            WHERE "municipality_ids" IS NOT NULL AND array_length("municipality_ids", 1) > 0',
            { transaction: t },
          ),
        )
        .then(() =>
          queryInterface.removeColumn('staff', 'municipality_ids', {
            transaction: t,
          }),
        ),
    )
  },
}
