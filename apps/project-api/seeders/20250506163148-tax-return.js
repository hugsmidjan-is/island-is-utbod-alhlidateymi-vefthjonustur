'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      const taxReturnUUID = uuidv4()
      await queryInterface.bulkInsert('tax_return', [
        {
          id: taxReturnUUID,
          year: 2024,
          person_id: 1203894569,
          name: 'Jökull Þórðarson',
        },
      ])

      const propertyDebtTypeUUID = uuidv4()
      const generalDebtTypeUUID = uuidv4()
      await queryInterface.bulkInsert('debt_types', [
        {
          id: propertyDebtTypeUUID,
          name: 'property',
        },
        {
          id: generalDebtTypeUUID,
          name: 'general',
        },
      ])

      const prefillDebtUUID = uuidv4()
      await queryInterface.bulkInsert('debt', [
        {
          id: prefillDebtUUID,
          type: 'prefill',
          tax_return_id: taxReturnUUID,
        },
      ])

      await queryInterface.bulkInsert('debt_lines', [
        {
          id: uuidv4(),
          debt_id: prefillDebtUUID,
          debt_type_id: propertyDebtTypeUUID,
          term: 360,
          origination_date: new Date('2021-06-15'),
          identifier: '56783900123',
          label: 'Bláfjallagata 12',
          outstanding_principal: 28_540_000,
          interest_amount: 920_000,
          annual_total_payment: 2_280_000,
          annual_total_principal_payment: 1_360_000,
          creditor_id: '4910080160',
        },
        {
          id: uuidv4(),
          debt_id: prefillDebtUUID,
          debt_type_id: generalDebtTypeUUID,
          label: 'Eftirstöðvar á korti númer: 4469 88XX XXXX 4567',
          outstanding_principal: 217_000,
          interest_amount: 39_200,
        },
        {
          id: uuidv4(),
          debt_id: prefillDebtUUID,
          debt_type_id: generalDebtTypeUUID,
          label: 'Aukalán',
          outstanding_principal: 980_000,
          interest_amount: 86_000,
        },
        {
          id: uuidv4(),
          debt_id: prefillDebtUUID,
          debt_type_id: generalDebtTypeUUID,
          label: '0142-26-732645 Varðan',
          outstanding_principal: 62_000,
          interest_amount: 14_500,
        },
        {
          id: uuidv4(),
          debt_id: prefillDebtUUID,
          debt_type_id: generalDebtTypeUUID,
          label: 'Kílómetragjald, Skatturinn',
          outstanding_principal: 2_370,
          interest_amount: 0,
        },
        {
          id: uuidv4(),
          debt_id: prefillDebtUUID,
          debt_type_id: generalDebtTypeUUID,
          label: 'Þing- og sveitarsjóðsgjöld, Skatturinn',
          outstanding_principal: 0,
          interest_amount: 224,
        },
      ])
    })
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      // Delete rows from dependent tables first
      await queryInterface.bulkDelete('debt_lines', null, { transaction: t })
      await queryInterface.bulkDelete('debt', null, { transaction: t })
      await queryInterface.bulkDelete('debt_types', null, { transaction: t })

      // Delete rows from dependent tables first
      await queryInterface.bulkDelete('income_lines', null, { transaction: t })
      await queryInterface.bulkDelete('income', null, { transaction: t })
      await queryInterface.bulkDelete('income_types', null, { transaction: t })

      // Finally, delete rows from the tax_return table
      await queryInterface.bulkDelete('tax_return', null, { transaction: t })
    })
  },
}
