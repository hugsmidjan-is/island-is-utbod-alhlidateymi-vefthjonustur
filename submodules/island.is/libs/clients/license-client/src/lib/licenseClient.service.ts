import { Inject, Injectable } from '@nestjs/common'
import {
  CONFIG_PROVIDER,
  LICENSE_CLIENT_FACTORY,
  LicenseClient,
  LicenseType,
} from './licenseClient.type'
import type { PassTemplateIds, LicenseTypeType } from './licenseClient.type'

@Injectable()
export class LicenseClientService {
  constructor(
    @Inject(LICENSE_CLIENT_FACTORY)
    private licenseClientFactory: <Type extends LicenseType>(
      type: LicenseType,
    ) => Promise<LicenseClient<Type>>,
    @Inject(CONFIG_PROVIDER) private config: PassTemplateIds,
  ) {}

  private getClient = <Type extends LicenseType>(type: LicenseType) =>
    this.licenseClientFactory<Type>(type)

  private getTypeByPassTemplateId(id: string) {
    for (const [key, value] of Object.entries(this.config)) {
      // some license Config id === barcode id
      if (value === id) {
        // firearmLicense => FirearmLicense
        const keyAsEnumKey = key.slice(0, 1).toUpperCase() + key.slice(1)

        const valueFromEnum: LicenseType | undefined =
          LicenseType[keyAsEnumKey as LicenseTypeType]

        if (!valueFromEnum) {
          throw new Error(`Invalid license type: ${key}`)
        }
        return valueFromEnum
      }
    }
    return null
  }

  getClientByLicenseType<Type extends LicenseType>(type: LicenseType) {
    return this.getClient<Type>(type)
  }

  getClientByPassTemplateId(passTemplateId: string) {
    const type = this.getTypeByPassTemplateId(passTemplateId)

    return type ? this.getClient(type) : null
  }
}
