import {
  GridContainer,
  GridRow,
  GridColumn,
  Box,
  Text,
} from '@island.is/island-ui/core'
import { ReactNode } from 'react'

interface CustomErrorProps {
  statusCode: number
  title: string
  children: ReactNode
}

const CustomError = ({ statusCode, title, children }: CustomErrorProps) => {
  return (
    <GridContainer>
      <GridRow>
        <GridColumn span={'12/12'} paddingBottom={10} paddingTop={8}>
          <Box
            display="flex"
            flexDirection="column"
            width="full"
            alignItems="center"
          >
            <Text
              variant="eyebrow"
              as="div"
              paddingBottom={2}
              color="purple400"
            >
              {statusCode}
            </Text>
            <Text variant="h1" as="h1" paddingBottom={3}>
              {title}
            </Text>
            {children}
          </Box>
        </GridColumn>
      </GridRow>
    </GridContainer>
  )
}

export default CustomError
