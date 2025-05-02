module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;
        ALTER TABLE access_control ADD COLUMN email VARCHAR;
        ALTER TABLE access_control ADD COLUMN phone VARCHAR;
        ALTER TABLE access_control ADD COLUMN recycling_location VARCHAR;
      COMMIT;
    `)
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      ALTER TABLE access_control DROP COLUMN email;
      ALTER TABLE access_control DROP COLUMN phone;
      ALTER TABLE access_control DROP COLUMN recycling_location;
    `)
  },
}
