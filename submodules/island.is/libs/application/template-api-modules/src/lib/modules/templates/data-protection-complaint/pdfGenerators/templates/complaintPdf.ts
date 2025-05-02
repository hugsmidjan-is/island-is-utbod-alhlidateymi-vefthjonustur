import { ComplaintPDF, ExternalDataMessages, Information } from '../../models'

import { Application } from '@island.is/application/types'
import { applicationToComplaintPDF } from '../../data-protection-utils'
import { generatePdf } from '../pdfGenerator'
import {
  messages,
  OnBehalf,
  SubjectOfComplaint,
  subjectOfComplaintValueLabelMapper,
} from '@island.is/application/templates/data-protection-complaint'
import {
  addformFieldAndValue,
  addHeader,
  addLogo,
  addSubheader,
  addValue,
  formatSsn,
  setPageHeader,
} from '../pdfUtils'
import { PdfConstants } from '../constants'
import { dataProtectionLogo } from '../assets/logo'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import is from 'date-fns/locale/is'
import { DocumentInfo } from '@island.is/clients/data-protection-complaint'

export const generateComplaintPdf = async (
  application: Application,
  attachedFiles: DocumentInfo[],
): Promise<Buffer> => {
  const dto = applicationToComplaintPDF(application, attachedFiles)
  return await generatePdf<ComplaintPDF>(dto, dpcApplicationPdf)
}

const dpcApplicationPdf = (
  complaint: ComplaintPDF,
  doc: PDFKit.PDFDocument,
): void => {
  const timestamp = format(
    parseISO(complaint.submitDate.toISOString()),
    'd. MMMM y',
    {
      locale: is,
    },
  )
  setPageHeader(doc, timestamp)
  addLogo(doc, dataProtectionLogo)

  addHeader('Kvörtun til Persónuverndar', doc)

  renderContactsAndComplainees(complaint, doc)

  addSubheader(
    'Upplýsingar um fyrirtæki, stofnun eða einstakling sem kvartað er yfir',
    doc,
  )

  complaint.targetsOfComplaint.map((c) => {
    addformFieldAndValue('Nafn', c.name, doc, PdfConstants.SMALL_LINE_GAP)
    if (c.nationalId) {
      addformFieldAndValue(
        'Kennitala',
        formatSsn(c.nationalId),
        doc,
        PdfConstants.SMALL_LINE_GAP,
      )
    }
    addformFieldAndValue(
      'Heimilisfang',
      c.address,
      doc,
      PdfConstants.SMALL_LINE_GAP,
    )
    const operatesWithinEuropeAnswer =
      c.operatesWithinEurope === 'yes' ? c.countryOfOperation : 'Ekki vitað/nei'
    addformFieldAndValue(
      'Veistu hvort viðkomandi aðili er með starfsemi í öðru landi innan Evrópu?',
      operatesWithinEuropeAnswer,
      doc,
      PdfConstants.SMALL_LINE_GAP,
    )
    doc.moveDown()
    if (c.operatesWithinEurope === 'yes') {
      addValue(
        messages.complaint.labels.complaineeOperatesWithinEuropeMessage
          .defaultMessage,
        doc,
        PdfConstants.NORMAL_FONT,
      )
      doc.moveDown(2)
    }
  })

  if (complaint.complaintCategories.length !== 0) {
    addSubheader('Efni kvörtunar', doc)
    // Render it in the same order as shown on the application it self
    for (const [key, value] of Object.entries(
      subjectOfComplaintValueLabelMapper,
    )) {
      // Check if the option was selected by the user
      const selection = complaint.complaintCategories.find(
        (x) => x === value.defaultMessage,
      )
      if (!selection) continue

      if (key === SubjectOfComplaint.OTHER) {
        // other "annað" is found, printing the message with it
        addValue(`• ${selection}: ${complaint.somethingElse}`, doc)
      } else {
        addValue(`• ${selection}`, doc)
      }
    }

    doc.moveDown()
  }

  addSubheader('Yfir hverju er kvartað í meginatriðum?', doc)
  addValue(complaint.description, doc, PdfConstants.NORMAL_FONT)
  doc.moveDown()
  if (complaint.attachments.length > 0) {
    addSubheader('Fylgiskjöl', doc)

    complaint.attachments.map((attachment) => {
      return addValue(attachment, doc, PdfConstants.NORMAL_FONT)
    })

    doc.moveDown()
  }
  doc.moveDown()

  renderExternalDataMessages(complaint.messages.externalData, doc)
  renderInformationMessages(complaint.messages.information, doc)

  doc.end()
}

const renderExternalDataMessages = (
  externalData: ExternalDataMessages,
  doc: PDFKit.PDFDocument,
): void => {
  addHeader(externalData.title, doc)
  addValue(externalData.subtitle, doc, PdfConstants.BOLD_FONT)
  addValue(externalData.description, doc)
  doc.moveDown()
  addValue(externalData.nationalRegistryTitle, doc, PdfConstants.BOLD_FONT)
  addValue(
    externalData.nationalRegistryDescription,
    doc,
    PdfConstants.NORMAL_FONT,
  )
  doc.moveDown()
  addValue(externalData.userProfileTitle, doc, PdfConstants.BOLD_FONT)
  addValue(externalData.userProfileDescription, doc, PdfConstants.NORMAL_FONT)
  doc.moveDown()
}

const renderInformationMessages = (
  information: Information,
  doc: PDFKit.PDFDocument,
): void => {
  addHeader(information.title, doc)

  const bulletsList = [
    information.bullets.bulletOne,
    information.bullets.bulletTwo,
    information.bullets.bulletThree,
    information.bullets.bulletFour,
    information.bullets.bulletFive,
    information.bullets.bulletSix,
    information.bullets.bulletSeven,
    information.bullets.bulletEight,
  ]

  bulletsList.map(({ bullet, link, linkText }) => {
    const splitBullet = bullet.split('{link}')
    if (splitBullet.length === 2) {
      return doc
        .font(PdfConstants.NORMAL_FONT)
        .fontSize(PdfConstants.VALUE_FONT_SIZE)
        .lineGap(PdfConstants.NORMAL_LINE_GAP)
        .text('• ', { continued: true })
        .text(splitBullet[0], { continued: true })
        .fillColor('blue')
        .text(linkText, {
          continued: true,
          link: link,
        })
        .fillColor('black')
        .text(splitBullet[1], { paragraphGap: 10 })
    } else {
      return doc
        .font(PdfConstants.NORMAL_FONT)
        .fontSize(PdfConstants.VALUE_FONT_SIZE)
        .lineGap(PdfConstants.NORMAL_LINE_GAP)
        .text('• ', { continued: true })
        .text(bullet, { paragraphGap: 10 })
    }
  })
}

const renderContactsAndComplainees = (
  complaint: ComplaintPDF,
  doc: PDFKit.PDFDocument,
): void => {
  const contactHeading =
    complaint.onBehalf === OnBehalf.MYSELF ||
    complaint.onBehalf === OnBehalf.ORGANIZATION_OR_INSTITUTION ||
    (complaint.onBehalf === OnBehalf.OTHERS &&
      complaint.agency?.persons &&
      complaint.agency.persons.length === 1)
      ? 'Kvartandi'
      : 'Kvartendur'

  if (
    complaint.onBehalf === OnBehalf.ORGANIZATION_OR_INSTITUTION ||
    complaint.onBehalf !== OnBehalf.OTHERS
  ) {
    addSubheader(contactHeading, doc)
  }

  addformFieldAndValue(
    'Nafn',
    complaint.contactInfo.name,
    doc,
    PdfConstants.SMALL_LINE_GAP,
  )
  addformFieldAndValue(
    'Kennitala',
    complaint.contactInfo.nationalId,
    doc,
    PdfConstants.SMALL_LINE_GAP,
  )

  addformFieldAndValue(
    'Heimilisfang',
    `${complaint.contactInfo.address}, ${complaint.contactInfo.postalCode} ${complaint.contactInfo.city}`,
    doc,
    PdfConstants.SMALL_LINE_GAP,
  )

  complaint.contactInfo.phone &&
    addformFieldAndValue(
      'Sími',
      complaint.contactInfo.phone,
      doc,
      PdfConstants.SMALL_LINE_GAP,
    )

  complaint.contactInfo.email &&
    addformFieldAndValue(
      'Netfang',
      complaint.contactInfo.email,
      doc,
      PdfConstants.SMALL_LINE_GAP,
    )

  doc.moveDown()

  if (complaint.onBehalf === OnBehalf.OTHERS) {
    addSubheader(contactHeading, doc)
  }

  renderAgencyComplainees(complaint, doc)

  if (complaint.onBehalf === OnBehalf.OTHERS) {
    addSubheader('Tengiliður', doc)
  }

  /* Contact if complaint is for the hand of company/organization, it's optional to fill out */
  if (
    complaint.contactInfo.contactName.length > 0 ||
    complaint.contactInfo.contactEmail.length > 0
  ) {
    addSubheader('Tengiliður', doc)
    complaint.contactInfo.contactName.length > 0 &&
      addformFieldAndValue(
        'Nafn',
        complaint.contactInfo.contactName,
        doc,
        PdfConstants.SMALL_LINE_GAP,
      )
    complaint.contactInfo.contactEmail.length > 0 &&
      addformFieldAndValue(
        'Netfang',
        complaint.contactInfo.contactEmail,
        doc,
        PdfConstants.SMALL_LINE_GAP,
      )
    doc.moveDown()
  }
}

const renderAgencyComplainees = (
  complaint: ComplaintPDF,
  doc: PDFKit.PDFDocument,
): void => {
  if (
    complaint.agency?.persons?.length &&
    complaint.onBehalf !== OnBehalf.ORGANIZATION_OR_INSTITUTION &&
    complaint.onBehalf !== OnBehalf.MYSELF
  ) {
    complaint.agency.persons.map((person) => {
      addformFieldAndValue(
        'Nafn',
        person.name,
        doc,
        PdfConstants.SMALL_LINE_GAP,
      )
      addformFieldAndValue(
        'Kennitala',
        person.nationalId,
        doc,
        PdfConstants.SMALL_LINE_GAP,
      )

      doc.moveDown()
    })
  }
}
