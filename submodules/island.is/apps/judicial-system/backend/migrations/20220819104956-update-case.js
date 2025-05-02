'use strict'
const replaceEnum = require('sequelize-replace-enum-postgres').default

module.exports = {
  up: (queryInterface) => {
    // replaceEnum does not support transactions
    return replaceEnum({
      queryInterface,
      tableName: 'case',
      columnName: 'type',
      newValues: [
        'CHILD_PROTECTION_LAWS', // new values begin
        'PROPERTY_DAMAGE',
        'NARCOTICS_OFFENSE',
        'EMBEZZLEMENT',
        'FRAUD',
        'DOMESTIC_VIOLENCE',
        'ASSAULT_LEADING_TO_DEATH',
        'MURDER',
        'MAJOR_ASSAULT',
        'MINOR_ASSAULT',
        'RAPE',
        'UTILITY_THEFT',
        'AGGRAVATED_ASSAULT',
        'TAX_VIOLATION',
        'ATTEMPTED_MURDER',
        'TRAFFIC_VIOLATION',
        'THEFT',
        'OTHER_CRIMINAL_OFFENSES',
        'SEXUAL_OFFENSES_OTHER_THAN_RAPE',
        'OTHER_OFFENSES', // new values end
        'CUSTODY',
        'TRAVEL_BAN',
        'ADMISSION_TO_FACILITY',
        'SEARCH_WARRANT',
        'BANKING_SECRECY_WAIVER',
        'PHONE_TAPPING',
        'TELECOMMUNICATIONS',
        'TRACKING_EQUIPMENT',
        'PSYCHIATRIC_EXAMINATION',
        'SOUND_RECORDING_EQUIPMENT',
        'AUTOPSY',
        'BODY_SEARCH',
        'INTERNET_USAGE',
        'RESTRAINING_ORDER',
        'EXPULSION_FROM_HOME',
        'ELECTRONIC_DATA_DISCOVERY_INVESTIGATION',
        'VIDEO_RECORDING_EQUIPMENT',
        'OTHER',
      ],
      enumName: 'enum_case_type',
    })
  },

  down: (queryInterface) => {
    // replaceEnum does not support transactions
    return replaceEnum({
      queryInterface,
      tableName: 'case',
      columnName: 'type',
      newValues: [
        'CUSTODY',
        'TRAVEL_BAN',
        'ADMISSION_TO_FACILITY',
        'SEARCH_WARRANT',
        'BANKING_SECRECY_WAIVER',
        'PHONE_TAPPING',
        'TELECOMMUNICATIONS',
        'TRACKING_EQUIPMENT',
        'PSYCHIATRIC_EXAMINATION',
        'SOUND_RECORDING_EQUIPMENT',
        'AUTOPSY',
        'BODY_SEARCH',
        'INTERNET_USAGE',
        'RESTRAINING_ORDER',
        'EXPULSION_FROM_HOME',
        'ELECTRONIC_DATA_DISCOVERY_INVESTIGATION',
        'VIDEO_RECORDING_EQUIPMENT',
        'OTHER',
      ],
      enumName: 'enum_case_type',
    })
  },
}
