import { defineMessages } from 'react-intl'

export const applicationCheck = {
  submitApplication: defineMessages({
    sellerNotValid: {
      id: 'aosh.cms.application:applicationCheck.submitApplication.sellerNotValid',
      defaultMessage:
        'Aðeins sá sem skráði umsókn má vera skráður sem seljandi.',
      description: 'Only applicant can be registered as seller',
    },
  }),
  validation: defineMessages({
    alertTitle: {
      id: 'aosh.tmo.application:applicationCheck.validation.alertTitle',
      defaultMessage: 'Það kom upp villa',
      description: 'Application check validation alert title',
    },
    noMachine: {
      id: 'aosh.tmo.application:applicationCheck.validation.noMachine',
      defaultMessage: 'Engin vél hefur verið valin',
      description: 'No machine selected',
    },
  }),
}
