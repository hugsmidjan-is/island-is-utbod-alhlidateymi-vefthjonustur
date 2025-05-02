import { getValueViaPath } from '@island.is/application/core'
import { FormValue } from '@island.is/application/types'
import { CoOwnerAndOperator, UserInformation } from '../shared'

// Function to check if an application has pending approval
export const applicationHasPendingApproval = (
  answers: FormValue,
  excludeNationalId?: string,
): boolean => {
  // Check if buyer has not approved
  const buyer = getValueViaPath(answers, 'buyer', {}) as UserInformation
  if (
    (!excludeNationalId || buyer.nationalId !== excludeNationalId) &&
    !buyer.approved
  ) {
    return true
  }

  // Check if any buyer's co-owners/operators have not approved
  const buyerCoOwnersAndOperators = (
    getValueViaPath(
      answers,
      'buyerCoOwnerAndOperator',
      [],
    ) as CoOwnerAndOperator[]
  ).filter(({ wasRemoved }) => wasRemoved !== 'true')
  if (
    buyerCoOwnersAndOperators.some(
      ({ nationalId, approved }) =>
        (!excludeNationalId || nationalId !== excludeNationalId) && !approved,
    )
  ) {
    return true
  }

  // Check if any seller's co-owners have not approved
  const sellerCoOwners = getValueViaPath(
    answers,
    'sellerCoOwner',
    [],
  ) as CoOwnerAndOperator[]
  if (
    sellerCoOwners.some(
      ({ nationalId, approved }) =>
        (!excludeNationalId || nationalId !== excludeNationalId) && !approved,
    )
  ) {
    return true
  }

  return false
}

// Function to check if the current reviewer is the last one who needs to approve
export const isLastReviewer = (
  reviewerNationalId: string,
  answers: FormValue,
  newBuyerCoOwnerAndOperator: CoOwnerAndOperator[],
): boolean => {
  // If there are pending approvals (excluding current reviewer), then he is not the last reviewer
  if (applicationHasPendingApproval(answers, reviewerNationalId)) return false

  // If the current reviewer is the buyer, check for changes in buyer's co-owners/operators list
  const buyer = getValueViaPath(answers, 'buyer', {}) as UserInformation
  if (buyer.nationalId === reviewerNationalId) {
    const oldBuyerCoOwnersAndOperators = (
      getValueViaPath(
        answers,
        'buyerCoOwnerAndOperator',
        [],
      ) as CoOwnerAndOperator[]
    ).filter(({ wasRemoved }) => wasRemoved !== 'true')

    // If no changes in buyer co-owner/operator list, the buyer is the last reviewer
    if (newBuyerCoOwnerAndOperator === oldBuyerCoOwnersAndOperators) {
      return true
    }

    // If new buyer co-owners/operators have been added, buyer is not the last reviewer
    if (
      newBuyerCoOwnerAndOperator.length > oldBuyerCoOwnersAndOperators.length
    ) {
      return false
    }

    // If new reviewers were added (and others removed), the buyer is not the last reviewer
    const newReviewerAdded = newBuyerCoOwnerAndOperator.some(
      ({ nationalId }) =>
        !oldBuyerCoOwnersAndOperators.some(
          (oldReviewer) => oldReviewer.nationalId === nationalId,
        ),
    )
    return !newReviewerAdded
  }

  // Otherwise, the only review missing is from the current reviewer
  return true
}
