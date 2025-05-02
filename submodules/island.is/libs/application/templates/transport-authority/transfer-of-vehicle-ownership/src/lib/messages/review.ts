import { defineMessages } from 'react-intl'

export const review = {
  general: defineMessages({
    title: {
      id: 'ta.tvo.application:review.general.title',
      defaultMessage: 'Yfirlit eigendaskipta',
      description: 'Title of overview screen',
    },
    sectionTitle: {
      id: 'ta.tvo.application:review.general.sectionTitle',
      defaultMessage: 'Til samþykktar',
      description: 'Title of overview screen',
    },
    description: {
      id: 'ta.tvo.application:review.general.description',
      defaultMessage:
        'Vinsamlegast farðu yfir gögnin hér að neðan til að staðfesta að réttar upplýsingar hafi verið gefnar upp.',
      description: 'Description of overview screen',
    },
    approvedSectionTitle: {
      id: 'ta.tvo.application:review.general.approvedSectionTitle',
      defaultMessage: 'Yfirlit',
      description: 'Approved section title of overview screen',
    },
  }),
  status: defineMessages({
    title: {
      id: 'ta.tvo.application:review.status.title',
      defaultMessage: 'Staða tilkynningar',
      description: 'Title in status part of review process',
    },
    description: {
      id: 'ta.tvo.application:review.status.description',
      defaultMessage: 'Hér að neðan kemur fram hvað gerist næst',
      description: 'Description in status part of review process',
    },
    viewOverview: {
      id: 'ta.tvo.application:review.status.viewOverview',
      defaultMessage: 'Skoða yfirlit',
      description: 'View overview label in status part of review process',
    },
    openAgreement: {
      id: 'ta.tvo.application:review.status.openAgreement',
      defaultMessage: 'Opna samþykki',
      description: 'Open agreement label in status part of review process',
    },
    youLabel: {
      id: 'ta.tvo.application:review.status.youLabel',
      defaultMessage: 'þú',
      description: 'You label in status part of review process',
    },
  }),
  step: {
    tagText: defineMessages({
      received: {
        id: 'ta.tvo.application:review.step.tagText.received',
        defaultMessage: 'Móttekin',
        description: 'Received tag text in status step part of review process',
      },
      pendingApproval: {
        id: 'ta.tvo.application:review.step.tagText.pendingApproval',
        defaultMessage: 'Samþykki í bið',
        description:
          'Pending approval tag text in status step part of review process',
      },
    }),
    title: defineMessages({
      transferOfVehicle: {
        id: 'ta.tvo.application:review.step.title.transferOfVehicle',
        defaultMessage: 'Skráning eigendaskipta á ökutæki {variable}',
        description:
          'Transfer of vehicle title in status step part of review process',
      },
      payment: {
        id: 'ta.tvo.application:review.step.title.payment',
        defaultMessage: 'Greiðsla móttekin',
        description: 'Payment title in status step part of review process',
      },
      sellerCoOwner: {
        id: 'ta.tvo.application:review.step.title.sellerCoOwner',
        defaultMessage: 'Samþykki meðeiganda seljanda',
        description:
          'Seller coowner title in status step part of review process',
      },
      buyer: {
        id: 'ta.tvo.application:review.step.title.buyer',
        defaultMessage: 'Samþykki kaupanda',
        description: 'Buyer title in status step part of review process',
      },
      buyerCoOwner: {
        id: 'ta.tvo.application:review.step.title.buyerCoOwner',
        defaultMessage: 'Samþykki meðeiganda kaupanda',
        description:
          'Buyer coowner title in status step part of review process',
      },
      buyerOperator: {
        id: 'ta.tvo.application:review.step.title.buyerOperator',
        defaultMessage: 'Samþykki umráðarmanns kaupanda',
        description:
          'Buyer operator title in status step part of review process',
      },
    }),
    description: defineMessages({
      transferOfVehicle: {
        id: 'ta.tvo.application:review.step.description.transferOfVehicle',
        defaultMessage:
          'Tilkynning um eigendaskiptu hefur borist til Samgöngustofu',
        description:
          'Transfer of vehicle description in status step part of review process',
      },
      payment: {
        id: 'ta.tvo.application:review.step.description.payment',
        defaultMessage: 'Greitt hefur verið fyrir eigendaskiptin af seljanda',
        description:
          'Payment description in status step part of review process',
      },
      sellerCoOwner: {
        id: 'ta.tvo.application:review.step.description.sellerCoOwner',
        defaultMessage:
          'Beðið er eftir að meðeigandi/ur seljanda staðfesti eigendaskiptin',
        description:
          'Seller coowner description in status step part of review process',
      },
      buyer: {
        id: 'ta.tvo.application:review.step.description.buyer',
        defaultMessage:
          'Beðið er eftir að nýr eigandi staðfesti eigendaskiptin',
        description: 'Buyer description in status step part of review process',
      },
      buyerCoOwner: {
        id: 'ta.tvo.application:review.step.description.buyerCoOwner',
        defaultMessage:
          'Beðið er eftir að meðeigandi/ur kaupanda staðfesti eigendaskiptin',
        description:
          'Buyer coowner description in status step part of review process',
      },
      buyerOperator: {
        id: 'ta.tvo.application:review.step.description.buyerOperator',
        defaultMessage:
          'Beðið er eftir að umráðamaður/menn kaupanda staðfesti eigendaskiptin',
        description:
          'Buyer operator description in status step part of review process',
      },
    }),
  },
  buttons: defineMessages({
    back: {
      id: 'ta.tvo.application:review.buttons.back',
      defaultMessage: 'Til baka',
      description: 'Back button in review process',
    },
    reject: {
      id: 'ta.tvo.application:review.buttons.reject',
      defaultMessage: 'Hafna',
      description: 'Reject button in review process',
    },
    approve: {
      id: 'ta.tvo.application:review.buttons.approve',
      defaultMessage: 'Samþykkja',
      description: 'Approve button in review process',
    },
    tryAgain: {
      id: 'ta.tvo.application:review.buttons.tryAgain',
      defaultMessage: 'Reyna aftur',
      description: 'Try again button in review process',
    },
  }),
}
