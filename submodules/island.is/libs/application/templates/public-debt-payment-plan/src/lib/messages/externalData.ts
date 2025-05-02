import { defineMessages } from 'react-intl'

// Global string for the application
export const externalData = {
  general: defineMessages({
    pageTitle: {
      id: `pdpp.application:application.externalData.pageTitle`,
      defaultMessage: 'Gagnaöflun',
      description: 'External data section page title',
    },
    subTitle: {
      id: `pdpp.application:application.externalData.subTitle`,
      defaultMessage: 'Eftirfarandi gögn verða sótt rafrænt',
      description: 'External data section sub title',
    },
    checkboxLabel: {
      id: `pdpp.application:application.externalData.checkboxLabel`,
      defaultMessage: 'Ég skil að ofangreindra gagna verður aflað',
      description: 'External data checkbox label',
    },
    description: {
      id: `pdpp.application:application.externalData.description`,
      defaultMessage:
        'Tilgangur neðangreindrar upplýsingaöflunar er að gera greiðsluáætlun skv. 12. gr. laga um innheimtu opinberra skatta og gjalda, nr. 150/2019.',
      description: 'External data description',
    },
  }),
  companyLabels: defineMessages({
    companyRegistryTitle: {
      id: `pdpp.application:section.externalData.companyRegistryTitle`,
      defaultMessage: `Upplýsingar frá Fyrirtækjaskrá`,
      description: `External data section company registry title`,
    },
    companyRegistrySubTitle: {
      id: `pdpp.application:section.externalData.companyRegistrySubTitle`,
      defaultMessage: `Nafn, kennitala, lögheimili, póstfang`,
      description: `External data section company registry subtitle`,
    },
    companyTaxTitle: {
      id: `pdpp.application:section.externalData.companyTaxTitle`,
      defaultMessage: `Upplýsingar frá skattinum og innheimtumanni ríkissjóðs`,
      description: `External data section company tax title`,
    },
    companyTaxSubTitle: {
      id: `pdpp.application:section.externalData.companyTaxSubTitle`,
      defaultMessage: `Upplýsingar um stöðu skulda, skil á ársreikningum og framtölum ásamt skýrslum og skilagreinum.`,
      description: `External data section company tax subtitle`,
    },
  }),
  labels: defineMessages({
    paymentPlanTitle: {
      id: `pdpp.application:section.externalData.paymentPlanTitle`,
      defaultMessage: 'Upplýsingar frá Innheimtustofnun sveitarfélaga',
      description: 'External data section payment plan title',
    },
    paymentPlanSubtitle: {
      id: `pdpp.application:section.externalData.paymentPlanSubtitle`,
      defaultMessage: 'Upplýsingar um meðlagsgreiðslur.',
      description: 'External data section payment plan subtitle',
    },
    nationalRegistryTitle: {
      id: `pdpp.application:section.externalData.nationRegistryTitle`,
      defaultMessage: 'Upplýsingar frá Þjóðskrá',
      description: 'National Registry Title',
    },
    nationalRegistrySubTitle: {
      id: `pdpp.application:section.externalData.nationalRegistrySubTitle`,
      defaultMessage: 'Nafn og kennitala.',
      description: 'National Registry Subtitle',
    },
    identityRegistryTitle: {
      id: `pdpp.application:section.externalData.identityRegistryTitle`,
      defaultMessage: 'Upplýsingar frá Fyrirtækjaskrá',
      description: 'Identity Registry Title',
    },
    identityRegistrySubTitle: {
      id: `pdpp.application:section.externalData.identityRegistrySubTitle`,
      defaultMessage: 'Nafn, kennitala, lögheimili, póstfang.',
      description: 'Identity Registry Subtitle',
    },
    userProfileTitle: {
      id: `pdpp.application:section.externalData.userProfileTitle`,
      defaultMessage: 'Upplýsingar frá skattinum og innheimtumanni ríkissjóðs',
      description: 'User Profile Title',
    },
    userProfileSubTitle: {
      id: `pdpp.application:section.externalData.userProfileSubTitle`,
      defaultMessage:
        'Upplýsingar um stöðu krafna, launagreiðanda og ráðstöfunartekjur samkvæmt staðgreiðsluskrá. ',
      description: 'User Profile Subtitle',
    },
    paymentEmployerTitle: {
      id: `pdpp.application:section.externalData.paymentEmployerTitle`,
      defaultMessage: 'Samþykki fyrir tilkynningar',
      description: 'External data section payment plan title',
    },
    paymentEmployerSubtitle: {
      id: `pdpp.application:section.externalData.paymentEmployerSubtitle`,
      defaultMessage: 'Skilaboð um greiðslur o.fl. verða send til þín.',
      description: 'External data section payment plan title',
    },
    paymentDebtsTitle: {
      id: `pdpp.application:section.externalData.paymentDebtsTitle`,
      defaultMessage: 'Upplýsingar frá skattinum',
      description: 'External data section payment plan title',
    },
    paymentDebtsSubtitle: {
      id: `pdpp.application:section.externalData.paymentDebtsSubtitle`,
      defaultMessage: 'Upplýsingar um skuldir',
      description: 'External data section payment plan title',
    },
    externalDataSuccessSubmitFieldTitle: {
      id: 'pdpp.application:externalDataSuccessTitle',
      defaultMessage: 'Hefja umsókn',
      description: 'Start application button text',
    },
  }),
}
