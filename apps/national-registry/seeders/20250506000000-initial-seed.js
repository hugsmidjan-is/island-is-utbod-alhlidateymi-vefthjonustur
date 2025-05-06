'use strict'

const { readFile } = require('fs/promises')
const { cwd } = require('process')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // eslint-disable-next-line no-console
    console.log(cwd())
    const nationalRegistry = await readFile(
      './seeders/sql/national-registry.sql',
      'utf8',
    )

    const seed = `
      BEGIN;

      ${nationalRegistry}

      COMMIT;
      `

    return await queryInterface.sequelize.query(seed)
  },

  async down(queryInterface) {
    return await queryInterface.sequelize.query(`
      BEGIN;
        -- no op
      COMMIT;
    `)
  },
}
