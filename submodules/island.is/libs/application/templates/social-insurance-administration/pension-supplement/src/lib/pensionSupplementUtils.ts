import { getValueViaPath } from '@island.is/application/core'
import {
  BankAccountType,
  MONTHS,
} from '@island.is/application/templates/social-insurance-administration-core/lib/constants'
import {
  Attachments,
  BankInfo,
  FileType,
} from '@island.is/application/templates/social-insurance-administration-core/types'
import { Application, ExternalData, Option } from '@island.is/application/types'
import addMonths from 'date-fns/addMonths'
import subYears from 'date-fns/subYears'
import { PensionSupplementAttachments } from '../types'
import {
  ApplicationReason,
  AttachmentLabel,
  AttachmentTypes,
} from './constants'
import { pensionSupplementFormMessage } from './messages'

export const getApplicationAnswers = (answers: Application['answers']) => {
  const applicantPhonenumber = getValueViaPath(
    answers,
    'applicant.phoneNumber',
  ) as string

  const applicationReason = getValueViaPath(
    answers,
    'applicationReason',
  ) as ApplicationReason[]

  const selectedYear = getValueViaPath(answers, 'period.year') as string

  const selectedMonth = getValueViaPath(answers, 'period.month') as string

  const selectedYearHiddenInput = getValueViaPath(
    answers,
    'period.hiddenInput',
  ) as string

  const additionalAttachments = getValueViaPath(
    answers,
    'fileUploadAdditionalFiles.additionalDocuments',
  ) as FileType[]

  const additionalAttachmentsRequired = getValueViaPath(
    answers,
    'fileUploadAdditionalFilesRequired.additionalDocumentsRequired',
  ) as FileType[]

  const comment = getValueViaPath(answers, 'comment') as string

  const bankAccountType = getValueViaPath(
    answers,
    'paymentInfo.bankAccountType',
  ) as BankAccountType

  const bank = getValueViaPath(answers, 'paymentInfo.bank') as string

  const iban = getValueViaPath(answers, 'paymentInfo.iban') as string

  const swift = getValueViaPath(answers, 'paymentInfo.swift') as string

  const bankName = getValueViaPath(answers, 'paymentInfo.bankName') as string

  const bankAddress = getValueViaPath(
    answers,
    'paymentInfo.bankAddress',
  ) as string

  const currency = getValueViaPath(answers, 'paymentInfo.currency') as string

  const tempAnswers = getValueViaPath(
    answers,
    'tempAnswers',
  ) as Application['answers']

  const assistedCareAtHomeAttachments = getValueViaPath(
    answers,
    'fileUpload.assistedCareAtHome',
  ) as FileType[]

  const houseRentAttachments = getValueViaPath(
    answers,
    'fileUpload.houseRentAgreement',
  ) as FileType[]

  const houseRentAllowanceAttachments = getValueViaPath(
    answers,
    'fileUpload.houseRentAllowance',
  ) as FileType[]

  const assistedLivingAttachments = getValueViaPath(
    answers,
    'fileUpload.assistedLiving',
  ) as FileType[]

  const purchaseOfHearingAidsAttachments = getValueViaPath(
    answers,
    'fileUpload.purchaseOfHearingAids',
  ) as FileType[]

  const halfwayHouseAttachments = getValueViaPath(
    answers,
    'fileUpload.halfwayHouse',
  ) as FileType[]

  return {
    applicantPhonenumber,
    applicationReason,
    selectedYear,
    selectedMonth,
    selectedYearHiddenInput,
    additionalAttachments,
    additionalAttachmentsRequired,
    comment,
    bankAccountType,
    bank,
    iban,
    swift,
    bankName,
    bankAddress,
    currency,
    tempAnswers,
    assistedCareAtHomeAttachments,
    houseRentAttachments,
    houseRentAllowanceAttachments,
    assistedLivingAttachments,
    purchaseOfHearingAidsAttachments,
    halfwayHouseAttachments,
  }
}

export const getApplicationExternalData = (
  externalData: Application['externalData'],
) => {
  const applicantName = getValueViaPath(
    externalData,
    'nationalRegistry.data.fullName',
  ) as string

  const applicantNationalId = getValueViaPath(
    externalData,
    'nationalRegistry.data.nationalId',
  ) as string

  const userProfileEmail = getValueViaPath(
    externalData,
    'userProfile.data.email',
  ) as string

  const userProfilePhoneNumber = getValueViaPath(
    externalData,
    'userProfile.data.mobilePhoneNumber',
  ) as string

  const applicantAddress = getValueViaPath(
    externalData,
    'nationalRegistry.data.address.streetAddress',
  ) as string

  const applicantPostalCode = getValueViaPath(
    externalData,
    'nationalRegistry.data.address.postalCode',
  ) as string

  const applicantLocality = getValueViaPath(
    externalData,
    'nationalRegistry.data.address.locality',
  ) as string

  const applicantMunicipality = applicantPostalCode + ', ' + applicantLocality

  const email = getValueViaPath(
    externalData,
    'socialInsuranceAdministrationApplicant.data.emailAddress',
  ) as string

  const bankInfo = getValueViaPath(
    externalData,
    'socialInsuranceAdministrationApplicant.data.bankAccount',
  ) as BankInfo

  const currencies = getValueViaPath(
    externalData,
    'socialInsuranceAdministrationCurrencies.data',
  ) as Array<string>

  const isEligible = getValueViaPath(
    externalData,
    'socialInsuranceAdministrationIsApplicantEligible.data.isEligible',
  ) as boolean

  return {
    applicantName,
    applicantNationalId,
    userProfileEmail,
    userProfilePhoneNumber,
    applicantPostalCode,
    applicantAddress,
    applicantLocality,
    applicantMunicipality,
    email,
    bankInfo,
    currencies,
    isEligible,
  }
}

export const getApplicationReasonOptions = () => {
  const options: Option[] = [
    {
      value: ApplicationReason.MEDICINE_COST,
      label: pensionSupplementFormMessage.applicationReason.medicineCost,
    },
    {
      value: ApplicationReason.ASSISTED_CARE_AT_HOME,
      label: pensionSupplementFormMessage.applicationReason.assistedCareAtHome,
    },
    {
      value: ApplicationReason.OXYGEN_FILTER_ELECTRICITY_COST,
      label: pensionSupplementFormMessage.applicationReason.oxygenFilterCost,
    },
    {
      value: ApplicationReason.HELPING_EQUIPMENT,
      label:
        pensionSupplementFormMessage.applicationReason.purchaseOfHearingAids,
    },
    {
      value: ApplicationReason.ASSISTED_LIVING,
      label: pensionSupplementFormMessage.applicationReason.assistedLiving,
    },
    {
      value: ApplicationReason.HALFWAY_HOUSE,
      label: pensionSupplementFormMessage.applicationReason.halfwayHouse,
    },
    {
      value: ApplicationReason.HOUSE_RENT,
      label: pensionSupplementFormMessage.applicationReason.houseRent,
    },
  ]
  return options
}

export const getAttachments = (application: Application) => {
  const getAttachmentDetails = (
    attachmentsArr: FileType[] | undefined,
    attachmentType: AttachmentTypes,
  ) => {
    if (attachmentsArr && attachmentsArr.length > 0) {
      attachments.push({
        attachments: attachmentsArr,
        label: AttachmentLabel[attachmentType],
      })
    }
  }

  const { answers } = application
  const {
    applicationReason,
    additionalAttachments,
    additionalAttachmentsRequired,
  } = getApplicationAnswers(answers)
  const attachments: Attachments[] = []

  const pensionSupplementAttachments =
    answers.fileUpload as PensionSupplementAttachments

  applicationReason.forEach((reason) => {
    if (reason === ApplicationReason.ASSISTED_CARE_AT_HOME) {
      getAttachmentDetails(
        pensionSupplementAttachments?.assistedCareAtHome,
        AttachmentTypes.ASSISTED_CARE_AT_HOME,
      )
    }
    if (reason === ApplicationReason.HOUSE_RENT) {
      if (
        pensionSupplementAttachments?.houseRentAgreement &&
        pensionSupplementAttachments?.houseRentAgreement.length > 0 &&
        pensionSupplementAttachments?.houseRentAllowance &&
        pensionSupplementAttachments?.houseRentAllowance.length > 0
      ) {
        getAttachmentDetails(
          [
            ...pensionSupplementAttachments.houseRentAgreement,
            ...pensionSupplementAttachments.houseRentAllowance,
          ],
          AttachmentTypes.HOUSE_RENT,
        )
      }
    }
    if (reason === ApplicationReason.ASSISTED_LIVING) {
      getAttachmentDetails(
        pensionSupplementAttachments?.assistedLiving,
        AttachmentTypes.ASSISTED_LIVING,
      )
    }
    if (reason === ApplicationReason.HELPING_EQUIPMENT) {
      getAttachmentDetails(
        pensionSupplementAttachments?.purchaseOfHearingAids,
        AttachmentTypes.PURCHASE_OF_HEARING_AIDS,
      )
    }
    if (reason === ApplicationReason.HALFWAY_HOUSE) {
      getAttachmentDetails(
        pensionSupplementAttachments?.halfwayHouse,
        AttachmentTypes.HALFWAY_HOUSE,
      )
    }
  })

  const additionalDocuments = [
    ...(additionalAttachments && additionalAttachments?.length > 0
      ? additionalAttachments
      : []),
    ...(additionalAttachmentsRequired &&
    additionalAttachmentsRequired?.length > 0
      ? additionalAttachmentsRequired
      : []),
  ]

  if (additionalDocuments.length > 0) {
    getAttachmentDetails(
      additionalDocuments,
      AttachmentTypes.ADDITIONAL_DOCUMENTS,
    )
  }

  return attachments
}

// returns awailable years. Available period is
// 2 years back in time and 6 months in the future.
export const getAvailableYears = () => {
  const today = new Date()
  const twoYearsBackInTime = subYears(
    today.setMonth(today.getMonth() + 1),
    2,
  ).getFullYear()
  const sixMonthsInTheFuture = addMonths(new Date(), 6).getFullYear()

  return Array.from(
    Array(sixMonthsInTheFuture - (twoYearsBackInTime - 1)),
    (_, i) => {
      return {
        value: (i + twoYearsBackInTime).toString(),
        label: (i + twoYearsBackInTime).toString(),
      }
    },
  )
}

// returns available months for selected year, since available period is
// 2 years back in time and 6 months in the future.
export const getAvailableMonths = (selectedYear: string) => {
  if (!selectedYear) return []

  const twoYearsBackInTime = subYears(new Date(), 2)
  const sixMonthsInTheFuture = addMonths(new Date(), 6)

  let months = MONTHS
  if (twoYearsBackInTime.getFullYear().toString() === selectedYear) {
    months = months.slice(twoYearsBackInTime.getMonth() + 1, months.length)
  } else if (sixMonthsInTheFuture.getFullYear().toString() === selectedYear) {
    months = months.slice(0, sixMonthsInTheFuture.getMonth() + 1)
  }

  return months
}

export const isEligible = (externalData: ExternalData): boolean => {
  const { isEligible } = getApplicationExternalData(externalData)

  return isEligible
}
