import React, { useEffect, useRef, useState } from 'react'
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client'
import { useLocale } from '@island.is/localization'
import { useUserInfo } from '@island.is/react-spa/bff'
import { LoadingScreen } from '@island.is/react/components'
import { useFeatureFlagClient } from '@island.is/react/feature-flags'
import { m } from '../lib/messages'
import { PortalModule, PortalRoute } from '../types/portalCore'
import { createModuleRoutes } from '../utils/router/createModuleRoutes'
import { prepareRouterData } from '../utils/router/prepareRouterData'
import { PortalMeta, PortalProvider } from './PortalProvider'

type PortalRouterProps = {
  modules: PortalModule[]
  portalMeta: PortalMeta
  createRoutes(moduleRoutes: RouteObject[]): RouteObject[]
  fallbackElement?: React.ReactNode
}

export const PortalRouter = ({
  modules,
  portalMeta,
  createRoutes,
  fallbackElement,
}: PortalRouterProps) => {
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>
  const { formatMessage } = useLocale()
  const router = useRef<ReturnType<typeof createBrowserRouter>>()
  const [error, setError] = useState<Error | null>(null)
  const userInfo = useUserInfo()
  const featureFlagClient = useFeatureFlagClient()
  const [routerData, setRouterData] = useState<{
    modules: PortalModule[]
    routes: PortalRoute[]
  } | null>(null)

  useEffect(() => {
    if (userInfo) {
      prepareRouterData({
        userInfo,
        featureFlagClient,
        modules,
        client,
        formatMessage,
      })
        .then((data) => setRouterData(data))
        .catch((err) => setError(err))
    }
  }, [userInfo, modules, featureFlagClient])

  if (error) {
    throw error
  }

  if (!(userInfo && routerData)) {
    return <LoadingScreen ariaLabel={formatMessage(m.loadingScreen)} />
  }

  if (!router.current) {
    const moduleRoutes = createModuleRoutes({ ...routerData })
    router.current = createBrowserRouter(
      [
        {
          element: <PortalProvider meta={portalMeta} {...routerData} />,
          children: createRoutes(moduleRoutes),
        },
      ],
      {
        basename: portalMeta.basePath,
      },
    )
  }

  return (
    <RouterProvider
      router={router.current}
      fallbackElement={
        fallbackElement || (
          <LoadingScreen ariaLabel={formatMessage(m.loadingScreen)} />
        )
      }
    />
  )
}
