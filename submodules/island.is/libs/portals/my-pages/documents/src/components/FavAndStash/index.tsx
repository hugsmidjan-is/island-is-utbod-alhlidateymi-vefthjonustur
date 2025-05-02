import React, { MouseEvent } from 'react'
import { Box, Button, LoadingDots } from '@island.is/island-ui/core'
import * as styles from './FavAndStash.css'
import { Tooltip, m } from '@island.is/portals/my-pages/core'
import { useLocale } from '@island.is/localization'

type FavAndStashProps = {
  onFav?: (event: MouseEvent<HTMLElement>) => void
  onStash?: (event: MouseEvent<HTMLElement>) => void
  onRead?: (event: MouseEvent<HTMLElement>) => void
  bookmarked?: boolean
  archived?: boolean
  loading?: boolean
}

export const FavAndStash: React.FC<FavAndStashProps> = ({
  onFav,
  onStash,
  onRead,
  bookmarked,
  archived,
  loading,
}) => {
  const { formatMessage } = useLocale()

  if (loading) {
    return (
      <Box display="flex" alignItems="center">
        <LoadingDots />
      </Box>
    )
  }

  return (
    <Box className={styles.filterActionButtons} display="flex">
      {onStash && (
        <Tooltip
          text={formatMessage(archived ? m.removeFromStorage : m.addToStorage)}
        >
          <Button
            circle
            icon="fileTrayEmpty"
            iconType={archived ? 'filled' : 'outline'}
            onClick={onStash}
            size="small"
            colorScheme="light"
          />
        </Tooltip>
      )}
      {onFav && (
        <Tooltip
          text={formatMessage(bookmarked ? m.removeFavorite : m.addFavorite)}
        >
          <Button
            circle
            icon="star"
            iconType={bookmarked ? 'filled' : 'outline'}
            onClick={onFav}
            size="small"
            colorScheme="light"
          />
        </Tooltip>
      )}
      {onRead && (
        <Tooltip text={formatMessage(m.markAsRead)}>
          <Button
            circle
            icon="mailOpen"
            iconType="outline"
            onClick={onRead}
            size="small"
            colorScheme="light"
          />
        </Tooltip>
      )}
    </Box>
  )
}
