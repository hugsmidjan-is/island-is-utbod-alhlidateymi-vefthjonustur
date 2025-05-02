import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { NextComponentType } from 'next'
import { NextPageContext } from 'next/dist/shared/lib/utils'
import { Locale } from '@island.is/shared/types'

export interface Routes {
  admin: string
  adminCreateDiscount: string
  auth: string
  error: string
  home: string
  myBenefits: string
  notFound: string
  personalInfoUsage: string
  termsOfUse: string
}

export type GetInitialPropsContext<Context> = Context & {
  apolloClient: ApolloClient<NormalizedCacheObject>
  locale: Locale
  localeKey: Locale
  routeKey?: keyof Routes
  route?: keyof Routes
}

export type Screen<Props = {}> = NextComponentType<
  GetInitialPropsContext<NextPageContext>,
  Props,
  Props
>
