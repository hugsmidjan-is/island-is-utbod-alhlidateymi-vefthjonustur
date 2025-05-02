import { defineMessages } from 'react-intl'

export const error = defineMessages({
  invalidValue: {
    id: 'pa.application:error.invalidValue',
    defaultMessage: 'Ógilt gildi.',
    description: 'Error message when a value is invalid.',
  },
  invalidAgeTitle: {
    id: 'pa.application:error.invalidAgeTitle',
    defaultMessage: 'Þú hefur ekki náð tilskyldum aldri fyrir þessa umsókn',
    description: 'Error message when a value is invalid.',
  },
  invalidAgeDescription: {
    id: 'pa.application:error.invalidAgeDescription',
    defaultMessage: 'Tilskyldur aldur fyrir þessa umsókn er 18 ára.',
    description: 'Error message when a value is invalid.',
  },
})
