'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        'api_scope',
        'domain_name',
        {
          type: Sequelize.STRING,
          allowNull: true,
          references: { model: 'domain', key: 'name' },
        },
        { transaction },
      )

      await queryInterface.sequelize.query(
        `UPDATE api_scope SET domain_name = (SELECT domain_name FROM api_scope_group WHERE id = api_scope.group_id);`,
        { transaction },
      )

      await queryInterface.sequelize.query(
        `INSERT INTO domain
          (name, description, national_id, display_name, organisation_logo_key)
          SELECT domain_segment, domain_segment, '', domain_segment, domain_segment
          FROM (SELECT DISTINCT split_part(name, '/', 1) AS domain_segment FROM api_scope WHERE domain_name IS null) t
          WHERE NOT EXISTS (SELECT 0 FROM domain WHERE name = t.domain_segment);`,
        { transaction },
      )

      await queryInterface.sequelize.query(
        `UPDATE api_scope SET domain_name = split_part(name, '/', 1)
        WHERE domain_name IS null;`,
        { transaction },
      )

      await queryInterface.changeColumn(
        'api_scope',
        'domain_name',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction },
      )

      await queryInterface.addIndex('api_scope', ['domain_name'], {
        transaction,
      })
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('api_scope', 'domain_name', {
        transaction,
      })
    })
  },
}
