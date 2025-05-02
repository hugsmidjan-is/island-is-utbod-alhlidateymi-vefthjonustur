import { AdminPortalScope } from '@island.is/auth/scopes'
import { PortalModule, PortalModuleRoutesProps } from '@island.is/portals/core'
import React, { lazy } from 'react'
import { m } from './lib/messages'
import { ApplicationSystemPaths } from './lib/paths'
import { Navigate } from 'react-router-dom'

const Root = lazy(() => import('./screens/Root/Root'))

const Overview = lazy(() => import('./screens/Overview/Overview'))
const InstitutionOverview = lazy(() =>
  import('./screens/Overview/InstitutionOverview'),
)

const Statistics = lazy(() => import('./screens/Statistics/Statistics'))

const allowedScopes: string[] = [
  AdminPortalScope.applicationSystemAdmin,
  AdminPortalScope.applicationSystemInstitution,
]
const getScreen = ({ userInfo }: PortalModuleRoutesProps): React.ReactNode => {
  if (userInfo.scopes.includes(AdminPortalScope.applicationSystemInstitution)) {
    return <InstitutionOverview />
  }
  return <Overview />
}

export const applicationSystemAdminModule: PortalModule = {
  name: m.applicationSystem,
  layout: 'full',
  enabled: ({ userInfo }) =>
    userInfo.scopes.some((scope) => allowedScopes.includes(scope)),
  routes: (props) => [
    {
      name: m.overview,
      path: ApplicationSystemPaths.Root,
      element: <Root />,
      children: [
        {
          name: 'index',
          path: ApplicationSystemPaths.Root,
          index: true,
          element: <Navigate to={ApplicationSystemPaths.Overview} />,
        },
        {
          name: m.overview,
          path: ApplicationSystemPaths.Overview,
          element: getScreen(props),
        },
        {
          name: m.statistics,
          path: ApplicationSystemPaths.Statistics,
          element: <Statistics />,
          enabled: props.userInfo.scopes.includes(
            AdminPortalScope.applicationSystemAdmin,
          ),
        },
      ],
    },
  ],
}
