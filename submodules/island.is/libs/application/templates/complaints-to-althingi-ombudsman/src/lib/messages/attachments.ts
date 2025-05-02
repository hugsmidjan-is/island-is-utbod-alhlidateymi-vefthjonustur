import { defineMessages } from 'react-intl'

export const attachments = defineMessages({
  introduction: {
    id: 'ctao.application:section.attachments.introduction',
    defaultMessage: `Ef þú vilt láta nánari rökstuðning fyrir kvörtuninni fylgja er hægt að setja hann fram á sérstöku skjali í lok kvörtunarferlisins. 
										 Mikilvægt er að öll gögn fylgi kvörtun svo hún fái eins skjóta meðferð og hægt er. 
										 Það er líka hægt að koma með gögn á skrifstofu umboðsmanns Alþingis að Templarasundi 5 í Reykjavík eða senda þau með pósti.`,
    description: 'Introduction for attachment upload',
  },
  title: {
    id: 'ctao.application:section.attachments.title',
    defaultMessage: 'Nánari rökstuðningur kvörtunar og önnur fylgiskjöl',
    description: 'Title of attachments',
  },
  uploadDescription: {
    id: 'ctao.application:section.attachments.uploadDescription',
    defaultMessage:
      'Tekið er við skjölum með endingunum: .pdf, .doc, .docx, .rtf, .jpg, .jpeg, .png, .heic, .xlsx, .xls',
    description: 'Definition of upload description',
  },
  uploadHeader: {
    id: 'ctao.application:section.attachments.uploadHeader',
    defaultMessage: 'Dragðu viðhengi hingað til að hlaða upp',
    description: 'Definition of upload header',
  },
  uploadButtonLabel: {
    id: 'ctao.application:section.attachments.uploadButtonLabel',
    defaultMessage: 'Velja viðhengi til að hlaða upp',
    description: 'Definition of upload button label',
  },
})
