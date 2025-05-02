import { FC } from 'react'
import cn from 'classnames'

import { Box, Icon, Text } from '@island.is/island-ui/core'

import * as styles from './InfoBox.css'

interface Props {
  text: string
  onDismiss?: () => void
  fluid?: boolean
  light?: boolean
}

const InfoBox: FC<Props> = ({ text, onDismiss, fluid, light }) => {
  return (
    <div
      data-testid="infobox"
      className={cn(styles.infoBoxContainer, {
        [styles.fluid]: fluid,
        [styles.light]: light,
      })}
    >
      <Box display="flex" justifyContent="spaceBetween">
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            marginRight={2}
            flexShrink={0}
          >
            <Icon type="filled" color="blue400" icon="informationCircle" />
          </Box>
          <Text variant="small">{text}</Text>
        </Box>
        {onDismiss && (
          <Box
            component="button"
            aria-label="Hætta við"
            className={styles.trashButton}
            onClick={onDismiss}
          >
            <Icon icon="trash" type="outline" color="blue400" />
          </Box>
        )}
      </Box>
    </div>
  )
}

export default InfoBox
