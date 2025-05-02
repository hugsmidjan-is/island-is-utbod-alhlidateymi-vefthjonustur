import React from 'react'
import { NormalizedCacheObject } from '@apollo/client/cache'
import { ApolloClient } from '@apollo/client/core'

import { defaultLanguage } from '@island.is/shared/constants'
import { Locale } from '@island.is/shared/types'

import { GetNamespaceQuery, QueryGetNamespaceArgs } from '../graphql/schema'
import { GET_NAMESPACE_QUERY } from '../screens/queries'
import type { Screen } from '../types'
import { safelyExtractPathnameFromUrl } from '../utils/safelyExtractPathnameFromUrl'
import I18n, { isLocale } from './I18n'

export const getLocaleFromPath = (path = ''): Locale => {
  const maybeLocale = path.split('/').find(Boolean)
  return isLocale(maybeLocale) ? maybeLocale : defaultLanguage
}

interface NewComponentProps<T> {
  pageProps: T
  locale: Locale
  translations: { [k: string]: string }
}

export const withLocale =
  <Props,>(locale: Locale) =>
  (Component: Screen<Props>): Screen<Props> => {
    const getProps = Component.getProps
    if (!getProps) {
      return Component
    }

    const NewComponent: Screen<NewComponentProps<Props>> = ({
      pageProps,
      locale,
      translations,
    }) => (
      <I18n locale={locale} translations={translations}>
        {/**
           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
           // @ts-expect-error make web strict */}
        <Component {...pageProps} />
      </I18n>
    )
    NewComponent.getProps = async (ctx) => {
      const newContext = {
        ...ctx,
        locale:
          locale ||
          getLocaleFromPath(safelyExtractPathnameFromUrl(ctx?.req?.url)),
      } as any
      const [props, translations] = await Promise.all([
        getProps(newContext),
        getGlobalStrings(newContext),
      ])
      return {
        pageProps: props,
        locale,
        translations,
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error make web strict
    return NewComponent
  }

const getGlobalStrings = async ({
  apolloClient,
  locale,
}: {
  apolloClient: ApolloClient<NormalizedCacheObject>
  locale: Locale
}) => {
  return apolloClient
    .query<GetNamespaceQuery, QueryGetNamespaceArgs>({
      query: GET_NAMESPACE_QUERY,
      variables: {
        input: {
          namespace: 'Global',
          lang: locale,
        },
      },
    })
    .then((content) => {
      if (content.data.getNamespace) {
        // map data here to reduce data processing in component
        return JSON.parse(content.data.getNamespace.fields)
      }
      // Handle the case where content.data.getNamespace is null or undefined
      return {}
    })
}

export default withLocale
