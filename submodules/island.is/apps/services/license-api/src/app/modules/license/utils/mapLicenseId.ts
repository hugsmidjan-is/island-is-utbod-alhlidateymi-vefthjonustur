import capitalize from 'lodash/capitalize'
import { LicenseId } from '../license.types'
import { LicenseType } from '@island.is/clients/license-client'

export const mapLicenseIdToLicenseType = (
  licenseId: LicenseId,
): LicenseType | null => {
  return `${capitalize(licenseId)}License` as LicenseType
}
