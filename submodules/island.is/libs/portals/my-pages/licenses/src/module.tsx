import { lazy } from 'react'
import { ApiScope } from '@island.is/auth/scopes'
import { m } from '@island.is/portals/my-pages/core'
import { PortalModule } from '@island.is/portals/core'
import { LicensePaths } from './lib/paths'
import { defineMessage } from 'react-intl'
import { translationLoader } from './screens/Translation.loader'

const LicensesOverview = lazy(() => import('./screens/LicensesOverview'))
const LicenseDetail = lazy(() =>
  import('./screens/v1/LicenseDetail/LicenseDetail'),
)
const LicenseDetailV2 = lazy(() =>
  import('./screens/v2/LicenseDetail/LicenseDetail'),
)
const PassportDetail = lazy(() =>
  import('./screens/v1/PassportDetail/PassportDetail'),
)

export const licensesModule: PortalModule = {
  name: m.licenseNavTitle,
  enabled: ({ isCompany }) => !isCompany,
  routes: ({ userInfo, ...rest }) => [
    {
      name: defineMessage({
        id: 'sp.license:main-your-licenses',
        defaultMessage: 'Þín skírteini',
      }),
      path: LicensePaths.LicensesRoot,
      enabled: userInfo.scopes.includes(ApiScope.licenses),
      loader: translationLoader({ userInfo, ...rest }),
      element: <LicensesOverview />,
    },
    {
      name: 'Skírteini',
      path: LicensePaths.LicensesDetailV2,
      enabled: userInfo.scopes.includes(ApiScope.licenses),
      element: <LicenseDetailV2 />,
    },
    {
      name: 'Skírteini',
      path: LicensePaths.LicensesDetail,
      enabled: userInfo.scopes.includes(ApiScope.licenses),
      element: <LicenseDetail />,
    },
    {
      name: m.passport,
      path: LicensePaths.LicensesPassportDetail,
      enabled: userInfo.scopes.includes(ApiScope.licenses),
      element: <PassportDetail />,
    },
  ],
}
