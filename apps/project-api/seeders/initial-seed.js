'use strict'

const { readFile } = require('fs/promises')
const { cwd } = require('process')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // eslint-disable-next-line no-console
    console.log(cwd())
    const all = await readFile('./seeders/sql/x.sql', 'utf8')

    const seed = `
      BEGIN;

      ${all}

      COMMIT;
      `

    return await queryInterface.sequelize.query(seed)
  },

  async down(queryInterface) {
    return await queryInterface.sequelize.query(`
      BEGIN;
        -- RELATIONAL TABLES
        DROP TABLE IF EXISTS FOO;
      COMMIT;
    `)
  },
}
