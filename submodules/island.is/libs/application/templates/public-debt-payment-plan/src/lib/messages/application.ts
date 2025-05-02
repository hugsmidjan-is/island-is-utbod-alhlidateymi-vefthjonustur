import { defineMessages } from 'react-intl'

// Global string for the application
export const application = defineMessages({
  institutionName: {
    id: `pdpp.application:application.institutionName`,
    defaultMessage: 'Innheimtumaður',
    description: 'Name of the Public Debt Payment Plan institution',
  },
  name: {
    id: `pdpp.application:application.name`,
    defaultMessage: 'Umsókn um greiðsluáætlun',
    description: 'Name of the Public Debt Payment Plan application',
  },
  description: {
    id: `pdpp.application:application.description`,
    defaultMessage: 'Lýsing á umsókn um greiðsluáætlun',
    description: 'Description of the Public Debt Payment Plan application',
  },
})

// All sections in the application
export const section = defineMessages({
  externalData: {
    id: `pdpp.application:section.externalData`,
    defaultMessage: 'Gagnaöflun',
    description: 'External data section',
  },
  info: {
    id: `pdpp.application:section.info`,
    defaultMessage: 'Upplýsingar',
    description: 'Info section',
  },
  employer: {
    id: `pdpp.application:section.employer`,
    defaultMessage: 'Launagreiðandi',
    description: 'Employer section',
  },
  disposableIncome: {
    id: `pdpp.application:section.disposableIncome`,
    defaultMessage: 'Ráðstöfunartekjur',
    description: 'Disposable income section',
  },
  deptOverview: {
    id: `pdpp.application:section.deptOverview`,
    defaultMessage: 'Yfirlit yfir skuldir',
    description: 'Debt overview section',
  },
  paymentPlan: {
    id: `pdpp.application:section.paymentPlan`,
    defaultMessage: 'Greiðsludreifing',
    description: 'Payment plan section',
  },
  overview: {
    id: `pdpp.application:section.overview`,
    defaultMessage: 'Yfirlit',
    description: 'Overview section',
  },
  confirmation: {
    id: `pdpp.application:section.confirmation`,
    defaultMessage: 'Staðfesting',
    description: 'Confirmation section',
  },
})
