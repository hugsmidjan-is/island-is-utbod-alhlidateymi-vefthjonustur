import { defineMessages } from 'react-intl'

export const payment = {
  general: defineMessages({
    sectionTitle: {
      id: 'aosh.tmo.application:payment.general.sectionTitle',
      defaultMessage: 'Greiðsla',
      description: 'Title of for payment section',
    },
    pageTitle: {
      id: 'aosh.tmo.application:payment.general.pageTitle',
      defaultMessage: 'Greiðsla',
      description: 'Title of for payment page',
    },
  }),
  paymentChargeOverview: defineMessages({
    alertTitle: {
      id: 'aosh.tmo.application:payment.paymentChargeOverview.alertTitle',
      defaultMessage: 'Til athugunar!',
      description: 'Alert title',
    },
    alertMessage: {
      id: 'aosh.tmo.application:payment.paymentChargeOverview.alertMessage',
      defaultMessage:
        'Ef ekki verður komið samþykki frá nýjum eiganda innan 7 daga verður greiðslan endurgreidd og salan gerð óvirk.',
      description: 'Alert message',
    },
  }),
  confirmation: defineMessages({
    confirm: {
      id: 'aosh.tmo.application:payment.confirmation.confirm',
      defaultMessage: 'Áfram',
      description: 'Continue',
    },
  }),
}
