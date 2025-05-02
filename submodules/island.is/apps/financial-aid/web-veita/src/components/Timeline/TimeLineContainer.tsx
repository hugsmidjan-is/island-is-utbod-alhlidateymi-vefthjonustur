import React, { ReactNode } from 'react'
import { Text, Box } from '@island.is/island-ui/core'

import {
  ApplicationEvent,
  ApplicationEventType,
  getEventData,
} from '@island.is/financial-aid/shared/lib'
import * as styles from '../History/History.css'
import cn from 'classnames'
import format from 'date-fns/format'

interface Props {
  event: ApplicationEvent
  children: ReactNode
  [key: string]: any
  applicantName: string
  spouseName: string
}

const TimeLineContainer = ({
  event,
  applicantName,
  spouseName,
  children,
}: Props) => {
  const eventData = getEventData(event, applicantName, spouseName)

  const eventCreated = format(new Date(event.created), 'dd/MM/yyyy HH:mm')

  return (
    <>
      {event.eventType === ApplicationEventType.FILEUPLOAD && (
        <Box className={`${styles.timelineContainer}`}>
          <Box paddingLeft={3}>
            <Text variant="h5">Í vinnslu</Text>
            <Text marginBottom={2}>
              Stöðu <strong> breytt vegna innsendingu gagna</strong>
            </Text>
            <Text variant="small" color="dark300" marginBottom={5}>
              {eventCreated}
            </Text>
          </Box>
        </Box>
      )}

      <Box
        className={cn({
          [`${styles.timelineContainer}`]: true,
          [`${styles.acceptedEvent}`]:
            event.eventType === ApplicationEventType.APPROVED,
          [`${styles.rejectedEvent}`]:
            event.eventType === ApplicationEventType.REJECTED,
        })}
      >
        <Box paddingLeft={3}>
          <Text variant="h5">{eventData.header}</Text>
          <Text marginBottom={2}>
            {eventData.prefix} <strong>{eventData.text}</strong>
          </Text>
          {children}
          <Text variant="small" color="dark300" marginBottom={5}>
            {eventCreated}
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default TimeLineContainer
