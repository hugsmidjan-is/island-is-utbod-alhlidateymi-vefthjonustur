export enum ApiActions {
  getCurrentCountryOfResidenceList = 'getCurrentCountryOfResidenceList',
  getResidenceInIcelandLastChangeDate = 'getResidenceInIcelandLastChangeDate',
  submitApplication = 'submitApplication',
  validateApplication = 'validateApplication',
  applicantInformation = 'getApplicantInformation',
}

export const MAX_CNT_APPLICANTS = 18
export const FILE_SIZE_LIMIT = 10000000
export const FILE_TYPES_ALLOWED = '.pdf, .jpg, .jpeg,'

export const MIN_AGE_WRITTEN_CONSENT = 12
export const MIN_AGE_CHILD_INFORMATION_BOX = 11
export const MAX_AGE_CHILD_INFORMATION_BOX = 18
export const MIN_AGE_CHILD_WARNING = 17
