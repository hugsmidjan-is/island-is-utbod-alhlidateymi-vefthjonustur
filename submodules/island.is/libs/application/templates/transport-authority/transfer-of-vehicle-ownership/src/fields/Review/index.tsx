import { getValueViaPath } from '@island.is/application/core'
import { FieldBaseProps } from '@island.is/application/types'
import { Box } from '@island.is/island-ui/core'
import { useUserInfo } from '@island.is/react-spa/bff'
import { FC, useState } from 'react'
import { CoOwnerAndOperator, ReviewState } from '../../shared'
import { ApplicationStatus } from '../ApplicationStatus'
import { Insurance } from '../Insurance'
import { Overview } from '../Overview'
import { ReviewCoOwnerAndOperatorRepeater } from '../ReviewCoOwnerAndOperatorRepeater'
import { ReviewConclusion } from '../ReviewConclusion'
import { ReviewMainOperator } from '../ReviewMainOperator'

export const Review: FC<React.PropsWithChildren<FieldBaseProps>> = (props) => {
  const { application } = props
  const userInfo = useUserInfo()
  const [step, setStep] = useState<ReviewState>('states')
  const [insurance, setInsurance] = useState<string | undefined>(
    getValueViaPath(application.answers, 'insurance.value', undefined),
  )
  const [coOwnersAndOperators, setCoOwnersAndOperators] = useState<
    CoOwnerAndOperator[]
  >(
    getValueViaPath(
      application.answers,
      'buyerCoOwnerAndOperator',
      [],
    ) as CoOwnerAndOperator[],
  )
  const [mainOperator, setMainOperator] = useState<string>(
    getValueViaPath(
      application.answers,
      'buyerMainOperator.nationalId',
      '',
    ) as string,
  )
  const reviewerNationalId = userInfo?.profile.nationalId || null

  const filteredCoOwnersAndOperators = coOwnersAndOperators.filter(
    ({ wasRemoved }) => wasRemoved !== 'true',
  )

  const displayScreen = (
    displayStep: ReviewState,
    reviewerNationalId: string,
  ) => {
    switch (displayStep) {
      case 'states':
        return (
          <ApplicationStatus
            setStep={setStep}
            reviewerNationalId={reviewerNationalId}
            coOwnersAndOperators={filteredCoOwnersAndOperators}
            {...props}
          />
        )
      case 'overview':
        return (
          <Overview
            setStep={setStep}
            reviewerNationalId={reviewerNationalId}
            insurance={insurance}
            coOwnersAndOperators={filteredCoOwnersAndOperators}
            mainOperator={mainOperator}
            {...props}
          />
        )
      case 'conclusion':
        return (
          <ReviewConclusion
            setStep={setStep}
            reviewerNationalId={reviewerNationalId}
            coOwnersAndOperators={filteredCoOwnersAndOperators}
            {...props}
          />
        )
      case 'addPeople':
        return (
          <ReviewCoOwnerAndOperatorRepeater
            setStep={setStep}
            reviewerNationalId={reviewerNationalId}
            setCoOwnersAndOperators={setCoOwnersAndOperators}
            coOwnersAndOperators={coOwnersAndOperators}
            {...props}
          />
        )
      case 'mainOperator':
        return (
          <ReviewMainOperator
            setStep={setStep}
            coOwnersAndOperators={coOwnersAndOperators}
            setMainOperator={setMainOperator}
            mainOperator={mainOperator}
            {...props}
          />
        )
      case 'insurance':
        return (
          <Insurance
            setStep={setStep}
            reviewerNationalId={reviewerNationalId}
            setInsurance={setInsurance}
            {...props}
          />
        )
      default:
        return (
          <ApplicationStatus
            setStep={setStep}
            reviewerNationalId={reviewerNationalId}
            {...props}
          />
        )
    }
  }

  if (!reviewerNationalId) return null

  return <Box>{displayScreen(step, reviewerNationalId)}</Box>
}
