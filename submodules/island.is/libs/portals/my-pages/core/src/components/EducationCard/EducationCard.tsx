import React, { ReactNode } from 'react'
import { Box, Text, Tag } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import * as styles from './EducationCard.css'
interface ActionCard {
  eyebrow?: string
  title?: string
  description?: string
  img?: string
  CTA?: ReactNode
  imgPlaceholder?: string
}

// TODO: Move to a central location, at the moment there are Action cards in use that do not fit our current use case. should look into changing our card or one of the current cards (island-ui, portals-my-pages)
export const EducationCard = ({
  eyebrow,
  title,
  description,
  img,
  CTA,
  imgPlaceholder,
}: ActionCard) => {
  const { formatMessage } = useLocale()

  return (
    <Box
      display={['block', 'flex']}
      alignItems="center"
      paddingY={[2, 3, 4]}
      paddingX={[2, 3, 4]}
      border="standard"
      borderRadius="large"
    >
      <Box display="flex" alignItems="center">
        {img && <img src={img} alt="" className={styles.img} />}
        {imgPlaceholder && !img && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexShrink={0}
            marginRight={[2, 4]}
            borderRadius="full"
            background="blue100"
            color="blue400"
            className={styles.img}
          >
            <span className={styles.imgText}>{imgPlaceholder}</span>
          </Box>
        )}
        <div>
          {title && (
            <Text variant="h3" as="h3" color="dark400" marginBottom={1}>
              {title}
            </Text>
          )}
          {description && <Text fontWeight="light">{description}</Text>}
        </div>
      </Box>
      <Box
        marginTop={[2, 'auto']}
        marginLeft="auto"
        textAlign="right"
        display="flex"
        flexDirection="column"
      >
        {eyebrow && <Tag variant="purple">{eyebrow}</Tag>}
        {CTA && (
          <Box marginTop="p2" marginLeft="auto" textAlign="right">
            {CTA}
          </Box>
        )}
      </Box>
    </Box>
  )
}
