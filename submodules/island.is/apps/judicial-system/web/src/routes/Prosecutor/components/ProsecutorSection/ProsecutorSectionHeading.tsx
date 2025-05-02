import { FC } from 'react'
import { useIntl } from 'react-intl'

import { Box, Tooltip } from '@island.is/island-ui/core'
import { SectionHeading } from '@island.is/judicial-system-web/src/components'

import { strings } from './ProsecutorSectionHeading.strings'

interface Props {
  isIndictment?: boolean
}

const ProsecutorSectionHeading: FC<Props> = ({ isIndictment = false }) => {
  const { formatMessage } = useIntl()

  return (
    <SectionHeading
      title={`${formatMessage(strings.title)} `}
      tooltip={
        <Box component="span" data-testid="prosecutor-tooltip">
          <Tooltip
            text={formatMessage(
              isIndictment ? strings.indictmentTooltip : strings.tooltip,
            )}
          />
        </Box>
      }
    />
  )
}

export default ProsecutorSectionHeading
