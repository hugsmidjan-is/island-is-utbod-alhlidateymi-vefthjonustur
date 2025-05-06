'use strict'

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      const taxReturnUUID = 'bd5ade8e-cb7f-427d-935c-e09d0407b9bd'

      const propertyTypeUUID = uuidv4()
      const vehicleTypeUUID = uuidv4()
      await queryInterface.bulkInsert(
        'property_types',
        [
          {
            id: propertyTypeUUID,
            name: 'property',
          },
          {
            id: vehicleTypeUUID,
            name: 'vehicle',
          },
        ],
        { transaction: t },
      )

      const prefillPropertyUUID = uuidv4()
      await queryInterface.bulkInsert(
        'property',
        [
          {
            id: prefillPropertyUUID,
            type: 'prefill',
            tax_return_id: taxReturnUUID,
          },
        ],
        { transaction: t },
      )

      await queryInterface.bulkInsert(
        'property_lines',
        [
          {
            id: uuidv4(),
            property_id: prefillPropertyUUID,
            property_type_id: propertyTypeUUID,
            label: 'Bláfjallagata 12',
            identifier: '210-9876',
            value: 52_000_000,
            currency: 'ISK',
          },
          {
            id: uuidv4(),
            property_id: prefillPropertyUUID,
            property_type_id: vehicleTypeUUID,
            label: '2021',
            identifier: 'KB-521',
            value: 3_100_000,
            currency: 'ISK',
          },
          {
            id: uuidv4(),
            property_id: prefillPropertyUUID,
            property_type_id: vehicleTypeUUID,
            label: '2012',
            identifier: 'JU-329',
            value: 430_000,
            currency: 'ISK',
          },
        ],
        { transaction: t },
      )
    })
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkDelete('property_lines', null, {
        transaction: t,
      })
      await queryInterface.bulkDelete('properties', null, { transaction: t })
      await queryInterface.bulkDelete('property_types', null, {
        transaction: t,
      })
    })
  },
}
