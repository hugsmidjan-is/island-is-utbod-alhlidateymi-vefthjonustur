import { defineMessages } from 'react-intl'

export const strings = defineMessages({
  htmlTitle: {
    id: 'judicial.system.core:court_of_appeal.summary.html_title',
    defaultMessage: 'Samantekt - Réttarvörslugátt',
    description: 'Notaður sem titill síðu í vafra',
  },
  alertBannerTitle: {
    id: 'judicial.system.core:court_of_appeal.summary.alert_banner_title',
    defaultMessage: 'Niðurstaða Landsréttar',
    description: 'Titill á niðurstöðu landsréttar á samantektarsíðu',
  },
  title: {
    id: 'judicial.system.core:court_of_appeal.summary.title',
    defaultMessage: 'Samantekt',
    description: 'Notaður sem titill fyrir samantektarsíðu',
  },
  nextButtonFooter: {
    id: 'judicial.system.core:court_of_appeal.summary.next_button_footer',
    defaultMessage: 'Ljúka máli',
    description:
      'Notaður sem titill á ljúka máli takka á úrskurðin Landsrétta.',
  },
  appealCompletedModalTitle: {
    id: 'judicial.system.core:court_of_appeal.summary.appeal_completed_modal_title',
    defaultMessage: 'Máli hefur verið lokið',
    description:
      'Notaður sem titill á loka máli modal á skrefi samantektar Landsréttar.',
  },
  appealCompletedModalText: {
    id: 'judicial.system.core:court_of_appeal.summary.appeal_completed_modal_text',
    defaultMessage:
      'Tilkynning um úrskurð Landsréttar hefur verið send á aðila máls, héraðsdóm og fangelsi ef við á',
    description:
      'Notaður sem texti í loka máli modal á skrefi samantektar Landsréttar.',
  },
  appealDiscontinuedModalTitle: {
    id: 'judicial.system.core:court_of_appeal.summary.appeal_discontinued_modal_title',
    defaultMessage: 'Máli hefur verið lokið',
    description:
      'Notaður sem titill í niðurfelling máls modal á skrefi samantektar Landsréttar.',
  },
  appealDiscontinuedModalText: {
    id: 'judicial.system.core:court_of_appeal.summary.appeal_discontinued_modal_text',
    defaultMessage:
      'Tilkynning um niðurfellingu kæru hefur verið send á aðila máls',
    description:
      'Notaður sem texti í niðurfelling máls modal á skrefi samantektar Landsréttar.',
  },
})
