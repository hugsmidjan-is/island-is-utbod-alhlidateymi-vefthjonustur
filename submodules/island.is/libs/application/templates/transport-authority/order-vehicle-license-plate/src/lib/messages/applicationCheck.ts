import { defineMessages } from 'react-intl'

export const applicationCheck = {
  validation: defineMessages({
    alertTitle: {
      id: 'ta.ovlp.application:applicationCheck.validation.alertTitle',
      defaultMessage: 'Það kom upp villa',
      description: 'Application check validation alert title',
    },
    fallbackErrorMessage: {
      id: 'ta.ovlp.application:applicationCheck.validation.fallbackErrorMessage',
      defaultMessage: 'Það kom upp villa við að sannreyna gögn',
      description: 'Fallback error message for validation',
    },
  }),
}
