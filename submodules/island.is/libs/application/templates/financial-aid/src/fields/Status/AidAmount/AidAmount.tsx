import React from 'react'
import { useIntl } from 'react-intl'

import { Box, Text } from '@island.is/island-ui/core'
import {
  acceptedAmountBreakDown,
  Amount,
  Application,
  ApplicationState,
} from '@island.is/financial-aid/shared/lib'

import { aidAmount } from '../../../lib/messages'
import { Breakdown } from '../../index'
import { Estimation, VeitaEstimation } from '../index'
import { ExternalData, FAApplication, waitingForSpouse } from '../../..'

interface Props {
  application: FAApplication
  veitaApplication?: Application
  municipality: ExternalData['municipality']
  state?: ApplicationState
  amount?: Amount
}

const AidAmount = ({
  application,
  state,
  municipality,
  amount,
  veitaApplication,
}: Props) => {
  const { formatMessage } = useIntl()

  if (!application && !veitaApplication) {
    return null
  }

  return (
    <Box marginBottom={[4, 4, 5]}>
      {state === ApplicationState.APPROVED ? (
        <>
          <Text as="h3" variant="h3" marginBottom={2}>
            {formatMessage(aidAmount.titleApproved)}
          </Text>
          <Breakdown calculations={acceptedAmountBreakDown(amount)} />
        </>
      ) : waitingForSpouse(application.state) ? (
        <Estimation application={application} municipality={municipality} />
      ) : veitaApplication ? (
        <VeitaEstimation
          application={veitaApplication}
          municipality={municipality}
        />
      ) : null}
    </Box>
  )
}

export default AidAmount
