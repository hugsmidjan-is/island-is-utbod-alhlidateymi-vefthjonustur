import React from 'react'
import { getErrorViaPath, getValueViaPath } from '@island.is/application/core'
import { AlertBanner, Box, InputError, Text } from '@island.is/island-ui/core'
import { m } from '../../lib/messages'
import { useLocale } from '@island.is/localization'
import { DefaultEvents, FieldBaseProps } from '@island.is/application/types'
import { FinancialStatementsInao } from '../../lib/utils/dataSchema'
import { format as formatNationalId } from 'kennitala'
import { useSubmitApplication } from '../../hooks/useSubmitApplication'
import { ELECTIONLIMIT, GREATER } from '../../lib/constants'
import { formatNumber } from '../../lib/utils/helpers'
import BottomBar from '../../components/BottomBar'
import { useFormContext } from 'react-hook-form'

export const ElectionStatement = ({
  application,
  goToScreen,
  refetch,
}: FieldBaseProps) => {
  const { formatMessage } = useLocale()
  const {
    formState: { errors },
  } = useFormContext()
  const answers = application.answers as FinancialStatementsInao
  const email = getValueViaPath(answers, 'about.email')
  const [submitApplication, { loading }] = useSubmitApplication({
    application,
    refetch,
    event: DefaultEvents.SUBMIT,
  })

  const onBackButtonClick = () => {
    const incomeLimit = getValueViaPath(answers, 'election.incomeLimit')

    if (incomeLimit === GREATER) {
      goToScreen && goToScreen('attachments.file')
    } else {
      goToScreen && goToScreen('election')
    }
  }

  const onSendButtonClick = () => {
    submitApplication()
  }

  return (
    <Box>
      <Box paddingBottom={2}>
        <Text>
          {`${answers.about.fullName},
          ${formatMessage(m.nationalId)}: ${formatNationalId(
            answers.about.nationalId,
          )}, ${formatMessage(m.participated)} 
          ${answers.election.genitiveName}`}
        </Text>
      </Box>
      <Box paddingY={2}>
        <Text>{`${formatMessage(m.electionDeclare)} ${formatNumber(
          ELECTIONLIMIT,
        )}`}</Text>
      </Box>
      <Box paddingY={2}>
        <Text>{formatMessage(m.electionStatementLaw)}</Text>
      </Box>
      <Box paddingY={2}>
        <AlertBanner
          title={`${formatMessage(m.SignatureTitle)}`}
          description={`${formatMessage(
            m.SignatureMessage,
          )} ${email} ${formatMessage(m.SignaturePossible)}`}
          variant="info"
        />
      </Box>
      {errors && getErrorViaPath(errors, 'applicationApprove') ? (
        <InputError errorMessage={formatMessage(m.errorApproval)} />
      ) : null}
      <BottomBar
        loading={loading}
        onSendButtonClick={onSendButtonClick}
        onBackButtonClick={onBackButtonClick}
        sendText={formatMessage(m.sendStatement)}
      />
    </Box>
  )
}
