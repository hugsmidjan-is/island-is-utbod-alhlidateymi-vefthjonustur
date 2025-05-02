import get from 'lodash/get'
import {
  Agency,
  ApplicationMessages,
  ComplaintPDF,
  ContactInfo,
  ContactRole,
  TargetOfComplaint,
} from './models'
import {
  OnBehalf,
  SubjectOfComplaint,
  DataProtectionComplaintAnswers,
  yesNoValueLabelMapper,
  messages,
} from '@island.is/application/templates/data-protection-complaint'
import { Application } from '@island.is/application/types'
import * as kennitala from 'kennitala'
import {
  CreateCaseRequest,
  CreateQuickCaseRequest,
  DocumentInfo,
  LinkedContact,
  Metadata,
} from '@island.is/clients/data-protection-complaint'
import { subjectOfComplaintToGoProValues } from './mappers/complaintCategoryMapper'

const extractAnswer = <T>(
  object: unknown,
  path: string,
  defaultValue: unknown | undefined = undefined,
): T => {
  const value = get(object, path, defaultValue)
  if (defaultValue === undefined && typeof value === 'undefined') {
    throw new Error(`ComplaintDto.extractAnswer: missing value for ${path}`)
  }

  return value as T
}

export const getComplaintTargets = (
  answers: DataProtectionComplaintAnswers,
): TargetOfComplaint[] => {
  const targets = extractAnswer<TargetOfComplaint[]>(answers, 'complainees', [])
  return targets
}

export const getAgencies = (
  answers: DataProtectionComplaintAnswers,
): Agency[] => {
  return extractAnswer<Agency[]>(answers, 'commissions.persons', [])
}

export const getAndFormatOnBehalf = (application: Application): OnBehalf => {
  return extractAnswer<OnBehalf>(application.answers, 'info.onBehalf')
}

export const getAndFormatSubjectsOfComplaint = (
  answers: DataProtectionComplaintAnswers,
): string[] => {
  const values = extractAnswer<SubjectOfComplaint[]>(
    answers,
    'subjectOfComplaint.values',
  )

  const categories = values.reduce((acc: string[], value) => {
    const val = subjectOfComplaintToGoProValues(value)

    if (Array.isArray(val)) return [...acc, ...val]

    acc.push(val)
    return acc
  }, [])

  return [...new Set(categories)]
}

export const getAndFormatSubjectsOfComplaintForPdf = (
  answers: DataProtectionComplaintAnswers,
): string[] => {
  const values = extractAnswer<SubjectOfComplaint[]>(
    answers,
    'subjectOfComplaint.values',
  )

  const categories = values.map((val) => {
    return messages.complaint.labels[val].defaultMessage
  })
  return categories
}

export const gatherContacts = (
  answers: DataProtectionComplaintAnswers,
): LinkedContact[] => {
  const contact = getContactInfo(answers)
  //Kvartandi - main contact
  const complaintant = {
    type: getContactType(contact.nationalId),
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    address: contact.address,
    city: contact.city,
    idnumber: contact.nationalId,
    postalCode: contact.postalCode,
    role: ContactRole.COMPLAINTANT,
    primary: 'false',
    webPage: '',
  }

  //Ábyrgðaraðili - subject of complaint
  const complainees = getComplaintTargets(answers).map(
    (target: TargetOfComplaint, index: number) => {
      return {
        type: getContactType(target?.nationalId ?? ''),
        name: target.name,
        address: target.address,
        idnumber: target.nationalId,
        role: ContactRole.RESPONSIBLE,
        primary: index === 0 ? 'true' : 'false',
        webPage: '',
      }
    },
  )

  const agencies = getAgencies(answers).map((agency: Agency) => {
    return {
      type: getContactType(agency.nationalId),
      name: agency.name,
      address: '',
      idnumber: agency.nationalId,
      role: ContactRole.CLIENT,
      primary: 'false',
      webPage: '',
    }
  })

  return [complaintant, ...complainees, ...agencies]
}

export const getContactType = (nationalId: string): string => {
  return kennitala.isCompany(nationalId) ? 'Company' : 'Individual'
}

export const applicationToQuickCaseRequest = (
  application: Application,
): CreateQuickCaseRequest => {
  const answers = application.answers as DataProtectionComplaintAnswers

  return {
    category: 'Kvörtun',
    subject: 'kvörtun frá ísland.is',
    keywords: getAndFormatSubjectsOfComplaint(answers),
    metadata: toRequestMetadata(answers),
    template: 'Kvörtun',
  }
}

export const applicationToCaseRequest = async (
  application: Application,
  attachments: DocumentInfo[],
): Promise<CreateCaseRequest> => {
  const answers = application.answers as DataProtectionComplaintAnswers

  return {
    category: 'Kvörtun',
    subject: 'kvörtun frá ísland.is',
    keywords: getAndFormatSubjectsOfComplaint(answers),
    metadata: toRequestMetadata(answers),
    template: 'Kvörtun',
    contacts: gatherContacts(answers),
    documents: attachments,
  }
}

export const toRequestMetadata = (
  answers: DataProtectionComplaintAnswers,
): Metadata[] => {
  const onBehalf = extractAnswer<OnBehalf>(answers, 'info.onBehalf')

  const targets = getComplaintTargets(answers)
  const mainTarget = targets[0]

  if (!mainTarget)
    throw new Error('No targets of complaint found on application')

  return [
    {
      name: 'OnBehalf',
      value: onBehalf,
    },
    {
      name: 'OperatesWithinEurope',
      value:
        yesNoValueLabelMapper[mainTarget.operatesWithinEurope].defaultMessage,
    },
    {
      name: 'CountryOfOperation',
      value: mainTarget.countryOfOperation ?? '',
    },
  ]
}

export const applicationToComplaintPDF = (
  application: Application,
  attachedFiles: DocumentInfo[],
): ComplaintPDF => {
  const answers = application.answers as DataProtectionComplaintAnswers
  const timestamp = new Date()

  return {
    applicantInfo: {
      name: 'Applicant',
      nationalId: extractAnswer(application, 'applicant'),
    },
    onBehalf: getAndFormatOnBehalf(application),
    agency: {
      persons: getAgencies(answers),
    },
    contactInfo: getContactInfo(answers),
    targetsOfComplaint: getComplaintTargets(answers),
    complaintCategories: getAndFormatSubjectsOfComplaintForPdf(answers),
    somethingElse: answers.subjectOfComplaint.somethingElse ?? '',
    description: extractAnswer(application.answers, 'complaint.description'),
    submitDate: timestamp,
    attachments: attachedFiles
      .map((x) => x.fileName ?? '')
      .filter((x) => x !== ''),
    messages: getMessages(answers),
  }
}

export const getMessages = (
  answers: DataProtectionComplaintAnswers,
): ApplicationMessages => {
  return {
    externalData: {
      title: answers.overview.externalDataMessage.title,
      subtitle: answers.overview.externalDataMessage.subtitle,
      description: answers.overview.externalDataMessage.description,
      nationalRegistryTitle:
        answers.overview.externalDataMessage.nationalRegistryTitle,
      nationalRegistryDescription:
        answers.overview.externalDataMessage.nationalRegistryDescription,
      userProfileTitle: answers.overview.externalDataMessage.userProfileTitle,
      userProfileDescription:
        answers.overview.externalDataMessage.userProfileDescription,
      checkboxText: answers.overview.externalDataMessage.checkboxText,
    },
    information: {
      title: answers.overview.informationMessage.title,
      bullets: answers.overview.informationMessage.bullets,
    },
  }
}

export const getContactInfo = (
  answers: DataProtectionComplaintAnswers,
): ContactInfo => {
  const onBehalf = extractAnswer<OnBehalf>(answers, 'info.onBehalf')
  const contact =
    onBehalf === OnBehalf.ORGANIZATION_OR_INSTITUTION
      ? answers.organizationOrInstitution
      : answers.applicant

  return {
    name: contact.name,
    nationalId: contact.nationalId,
    type: '', //person | felag/samt
    address: contact.address,
    email: contact.email ?? '',
    phone: contact.phoneNumber ?? '',
    postalCode: contact.postalCode,
    city: contact.city,
    contactName:
      onBehalf === OnBehalf.ORGANIZATION_OR_INSTITUTION
        ? answers.organizationOrInstitution.contactName ?? ''
        : '',
    contactEmail:
      onBehalf === OnBehalf.ORGANIZATION_OR_INSTITUTION
        ? answers.organizationOrInstitution.contactEmail ?? ''
        : '',
  }
}
