import React from 'react'
import gql from 'graphql-tag'
import { Screen } from '../../types'
import { Layout } from '@island.is/air-discount-scheme-web/components/Layout'
import {
  Query,
  GenericPage as GenericPageSchema,
  QueryGetGenericPageArgs,
} from '@island.is/api/schema'
import {
  Box,
  Stack,
  Typography,
  GridRow,
  GridColumn,
} from '@island.is/island-ui/core'
import { Content } from '@island.is/air-discount-scheme-web/components'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

interface PropTypes {
  page?: GenericPageSchema
}

const GenericPage: Screen<PropTypes> = ({ page }) => {
  const { mainContent } = page
  return (
    <Layout
      main={
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '12/12', '12/12', '7/9']}
            offset={[null, null, null, null, '1/9']}
          >
            <Box marginBottom={4}>
              <Stack space={5}>
                <Typography variant="h1" as="h1">
                  {page.title}
                </Typography>
                <Content
                  document={mainContent}
                  wrapper={(children) => <Stack space={3}>{children}</Stack>}
                />
              </Stack>
            </Box>
          </GridColumn>
        </GridRow>
      }
      aside={
        <Content
          type="sidebar"
          document={page.sidebar}
          wrapper={(children) => <Stack space={3}>{children}</Stack>}
        />
      }
    />
  )
}

const GetGenericPageQuery = gql`
  query getGenericPage($input: GetGenericPageInput!) {
    getGenericPage(input: $input) {
      slug
      title
      intro
      mainContent
      sidebar
      misc
    }
  }
`

interface InitialProps {
  apolloClient: ApolloClient<NormalizedCacheObject>
  locale: string
  route?: string
}

GenericPage.getInitialProps = async ({
  apolloClient,
  locale,
  route,
}: InitialProps) => {
  const {
    data: { getGenericPage: page },
  } = await apolloClient.query<Query, QueryGetGenericPageArgs>({
    query: GetGenericPageQuery,
    variables: {
      input: {
        lang: locale,
        slug: route,
      },
    },
  })
  return {
    page,
  }
}

export default GenericPage
