'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return await queryInterface.sequelize.query(`
    BEGIN;

    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS FOO (
      ID UUID NOT NULL DEFAULT UUID_GENERATE_V4 (),
      TITLE VARCHAR NOT NULL,
      SLUG VARCHAR NOT NULL,
      PRIMARY KEY (ID)
    );

    COMMIT;

    `)
  },
}
