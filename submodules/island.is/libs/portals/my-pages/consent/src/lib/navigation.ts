import type { PortalNavigationItem } from '@island.is/portals/core'
import { m } from '@island.is/portals/my-pages/core'

import { ConsentPaths } from './paths'

export const consentNavigation: PortalNavigationItem = {
  name: m.consent,
  path: ConsentPaths.Consent,
}
