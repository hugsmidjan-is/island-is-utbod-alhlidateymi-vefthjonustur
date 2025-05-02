import React from 'react'
import { ActionCard, Box, Text } from '@island.is/island-ui/core'

import * as styles from './Status.css'

import {
  Application,
  ApplicationState,
  getNextPeriod,
  Routes,
} from '@island.is/financial-aid/shared/lib'

import { Estimation } from '@island.is/financial-aid-web/osk/src/components'
import { useRouter } from 'next/router'

interface Props {
  application: Application
  isApplicant?: boolean
}

const InProgress = ({ application, isApplicant = true }: Props) => {
  const router = useRouter()

  if (
    application.state === ApplicationState.APPROVED ||
    application.state === ApplicationState.REJECTED
  ) {
    return null
  }

  const header = () => {
    return application.state === ApplicationState.NEW
      ? 'Umsókn móttekin'
      : `Umsókn í vinnslu til útgreiðslu í ${getNextPeriod().month} ${
          getNextPeriod().year
        }`
  }

  return (
    <>
      <Text as="h2" variant="h3" color="blue400" marginBottom={[4, 4, 5]}>
        {header()}
      </Text>

      {application.state === ApplicationState.DATANEEDED && (
        <Box marginBottom={[4, 4, 5]}>
          <ActionCard
            heading="Vantar gögn"
            text="Við þurfum að fá gögn frá þér áður en við getum haldið áfram með umsóknina."
            cta={{
              label: 'Hlaða upp gögnum',
              onClick: () => {
                router.push(`
                ${Routes.statusFileUpload(router.query.id as string)}`)
              },
            }}
            backgroundColor="blue"
          />
        </Box>
      )}
      {isApplicant && (
        <Estimation
          homeCircumstances={application.homeCircumstances}
          usePersonalTaxCredit={application?.usePersonalTaxCredit}
          familyStatus={application.familyStatus}
          aboutText={
            <Text marginBottom={[2, 2, 3]}>
              Athugaðu að þessi útreikningur er{' '}
              <span className={styles.taxReturn}>
                eingöngu til viðmiðunar og getur tekið breytingum.
              </span>{' '}
              Þú færð skilaboð þegar frekari útreikningur liggur fyrir. Umsóknin
              verður afgreidd eins fljótt og auðið er.
            </Text>
          }
        />
      )}
    </>
  )
}

export default InProgress
