import React, { useContext } from 'react'

import { UserContext } from '@island.is/air-discount-scheme-web/context'
import { copyToClipboard } from '@island.is/air-discount-scheme-web/utils'
import { Discount } from '@island.is/air-discount-scheme-web/graphql/schema'
import {
  Box,
  Typography,
  ButtonDeprecated as Button,
} from '@island.is/island-ui/core'
import { Colors } from '@island.is/island-ui/theme'

type StatusOptions = {
  background: Colors
  borderColor: Colors
}

export type Status = 'fundUsed' | 'default'

type BoxStatus = {
  [Type in Status]: StatusOptions
}

const boxStatus: BoxStatus = {
  fundUsed: {
    background: 'dark100',
    borderColor: 'dark200',
  },
  default: {
    background: 'blue100',
    borderColor: 'blue200',
  },
}

interface PropTypes {
  discount: Discount
  misc: string
  status?: Status
}

function UserCredit({ discount, misc, status = 'default' }: PropTypes) {
  const { user: authUser } = useContext(UserContext)
  const { connectionDiscountCodes, user } = discount
  const { remaining, copyCode, kidsRights, usedFund } = JSON.parse(misc)

  return (
    <>
      {connectionDiscountCodes &&
        connectionDiscountCodes.map((connectionCode, index) => {
          if (!connectionCode.validUntil) {
            return
          }
          return (
            <Box
              {...boxStatus[status]}
              padding={2}
              borderWidth="standard"
              borderStyle="solid"
              borderRadius="standard"
              display={['block', 'flex']}
              justifyContent="spaceBetween"
              alignItems={['flexStart', 'center']}
              flexDirection={['column', 'row']}
            >
              <Box marginBottom={[3, 0]}>
                <Typography variant="h3">
                  {user.name}{' '}
                  {user?.nationalId !== authUser?.nationalId && kidsRights}
                </Typography>
                <Typography variant="p">
                  Flight:{connectionCode.flightId}
                </Typography>
              </Box>
              {status === 'fundUsed' ? (
                <Typography variant="h5">{usedFund}</Typography>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={['spaceBetween', 'flexStart']}
                >
                  <Box marginRight={[2, 4]}>
                    <Typography variant="h3" color="roseTinted400">
                      {connectionCode.code}
                    </Typography>
                    <Typography variant="p">
                      Valid until:{connectionCode.validUntil}
                    </Typography>
                  </Box>
                  <Button
                    noWrap
                    onClick={() => {
                      copyToClipboard(connectionCode.code)
                    }}
                  >
                    {copyCode}
                  </Button>
                </Box>
              )}
            </Box>
          )
        })}
    </>
  )
}

export default UserCredit
