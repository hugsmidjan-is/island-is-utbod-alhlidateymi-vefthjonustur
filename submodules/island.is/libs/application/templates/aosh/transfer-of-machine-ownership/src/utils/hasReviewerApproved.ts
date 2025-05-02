import { FormValue } from '@island.is/application/types'
import { getValueViaPath } from '@island.is/application/core'
import { UserInformation } from '../shared'

export const hasReviewerApproved = (
  reviewerNationalId: string,
  answers: FormValue,
) => {
  // Check if reviewer is buyer and has not approved
  if (
    (getValueViaPath(answers, 'buyer.nationalId', '') as string) ===
    reviewerNationalId
  ) {
    const buyer = getValueViaPath(answers, 'buyer') as UserInformation
    const hasApproved = buyer?.approved || false
    if (!hasApproved) return false
  }

  return true
}
