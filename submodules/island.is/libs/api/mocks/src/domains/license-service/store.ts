import { createStore } from '@island.is/shared/mocking'
import { GenericUserLicense, GetGenericLicenseInput } from '../../types'
import { genericUserLicense, genericUserLicenses } from './factories'

export const store = createStore(() => {
  let licenses: Array<GenericUserLicense> = []

  const getLicense = (input?: GetGenericLicenseInput) => {
    const license = licenses?.find((l) => l.license.type === input?.licenseType)

    return (
      license ?? genericUserLicense(input?.licenseType ?? 'DriversLicense')()
    )
  }

  const getLicenses = () => {
    if (!licenses.length) {
      licenses = genericUserLicenses([
        'DriversLicense',
        'FirearmLicense',
        'AdrLicense',
        'MachineLicense',
        'DisabilityLicense',
      ])
    }
    return licenses
  }

  return {
    getLicense,
    getLicenses,
  }
})
