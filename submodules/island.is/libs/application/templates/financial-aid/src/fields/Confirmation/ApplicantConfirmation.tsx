import React from 'react'

import { ApproveOptions, FAFieldBaseProps } from '../../lib/types'
import { confirmation } from '../../lib/messages'
import { hasFiles, hasSpouse } from '../../lib/utils'
import Confirmation from './Confirmation'

const ApplicantConfirmation = ({ application }: FAFieldBaseProps) => {
  const { answers, externalData } = application

  const applicantHasSpouse = hasSpouse(answers, externalData)
  const missingIncomeFiles =
    answers.income === ApproveOptions.Yes && !hasFiles('incomeFiles', answers)

  const firstStepText = () => {
    switch (true) {
      case applicantHasSpouse && missingIncomeFiles:
        return confirmation.nextSteps.contentBothMissingFiles
      case applicantHasSpouse:
        return confirmation.nextSteps.contentSpouseMissingFiles
      case missingIncomeFiles:
        return confirmation.nextSteps.contentMissingFiles
    }
  }

  return (
    <Confirmation
      firstStepText={firstStepText()}
      missingIncomeFiles={missingIncomeFiles}
      hasSpouse={applicantHasSpouse}
      spouseEmailSuccess={
        application.externalData.sendSpouseEmail?.data.success
      }
      municipalityHomepage={externalData.municipality.data?.homepage}
    />
  )
}

export default ApplicantConfirmation
