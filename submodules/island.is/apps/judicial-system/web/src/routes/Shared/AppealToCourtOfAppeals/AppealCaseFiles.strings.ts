import { defineMessages } from 'react-intl'

export const strings = defineMessages({
  title: {
    id: 'judicial.system.core:appeal_case_files.title',
    defaultMessage: 'Gögn',
    description: 'Titill á Gögn ákæru síðu',
  },
  appealCaseFilesTitle: {
    id: 'judicial.system.core:appeal_case_files.appeal_case_files_title',
    defaultMessage: 'Gögn',
    description: 'Titill á upload hluta á Gögn ákæru síðu',
  },
  appealCaseFilesSubtitle: {
    id: 'judicial.system.core:appeal_case_files.appeal_case_files_subtitle',
    defaultMessage:
      'Ef ný gögn eiga að fylgja kærunni er hægt að hlaða þeim upp hér að neðan.',
    description: 'Undirtitill á Gögn ákæru síðu',
  },
  appealCaseFilesCOASubtitle: {
    id: 'judicial.system.core:appeal_case_files.appeal_case_files_coa_subtitle',
    defaultMessage:
      'Athugið að gögn sem hér er hlaðið upp verða einungis sýnileg Landsrétti.',
    description: 'Undirtitill á Gögn ákæru síðu',
  },
  nextButtonText: {
    id: 'judicial.system.core:appeal_case_files.next_button_text_v2',
    defaultMessage: 'Senda gögn',
    description: 'Texti á Senda gögn takka á Gögn ákæru síðu',
  },
  appealCaseFilesUpdatedModalTitle: {
    id: 'judicial.system.core:appeal_case_files.appeal_sent_modal_title',
    defaultMessage: 'Gögn hafa verið send Landsrétti',
    description: 'Titill í Gögn hafa verið send Landsrétti modal',
  },
  appealCaseFilesUpdatedModalText: {
    id: 'judicial.system.core:appeal_case_files.appeal_sent_modal_text',
    defaultMessage:
      'Tilkynning hefur verið send Landsrétti{isDefenceUser, select, true { og sækjanda} other {}}.',
    description: 'Texti í Gögn hafa verið send Landsrétti modal',
  },
  appealActorAndDate: {
    id: 'judicial.system.core:appeal_case_files.appeal_actor_and_date',
    defaultMessage:
      'Kært af {appealedByProsecutor, select, true {sækjanda} other {verjanda}} {date}',
    description: 'Texti sem sýnir hver kærði og hvenær á gagnaskjá kærumála',
  },
  appealActorInCourt: {
    id: 'judicial.system.core:appeal_case_files.appeal_actor_in_court',
    defaultMessage:
      '{appealedByProsecutor, select, true {Sækjandi} other {Varnaraðili}} kærði í þinghaldi',
    description: 'Texti sem sýnir hver kærði í þinghaldi á gagnaskjá kærumála',
  },
  uploadFailedNextButtonText: {
    id: 'judicial.system.core:appeal_case_files.upload_failed_next_button_text',
    defaultMessage: 'Reyna aftur',
    description: 'Texti á reyna aftur takka á Gögn ákæru síðu',
  },
})
