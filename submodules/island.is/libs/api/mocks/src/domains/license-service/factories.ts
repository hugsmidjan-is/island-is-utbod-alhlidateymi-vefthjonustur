import { factory, faker, title } from '@island.is/shared/mocking'
import {
  GenericLicense,
  GenericLicenseFetch,
  GenericLicenseProviderId,
  GenericLicenseType,
  GenericUserLicense,
  GenericUserLicenseFetchStatus,
  GenericUserLicenseMetadata,
  GenericUserLicensePkPassStatus,
  GenericLicenseDataField,
  Payload,
  GenericLicenseDataFieldType,
} from '../../types'
import {
  mockAdrLicense,
  mockDriversLicense,
  mockFirearmLicense,
  mockMachineLicense,
} from './mocks'
import { mockDisabilityLicense } from './mocks/disabilityMock'
import { maybeExpired } from './mocks/utils'

const providerArray = [
  'AdministrationOfOccupationalSafetyAndHealth',
  'EnvironmentAgency',
  'NationalPoliceCommissioner',
  'SocialInsuranceAdministration',
]

const genericLicenseFetch = factory<GenericLicenseFetch>({
  status: 'Fetched' as GenericUserLicenseFetchStatus,
  updated: faker.date.recent().toISOString(),
})

const pkPassStatus = ['Available', 'NotAvailable', 'Unknown']

export const genericLicense = factory<GenericLicense>({
  pkpass: () => faker.datatype.boolean(),
  pkpassStatus: faker.random.arrayElement(
    pkPassStatus,
  ) as GenericUserLicensePkPassStatus,
  pkpassVerify: () => faker.datatype.boolean(),
  provider: () => ({
    id: faker.random.arrayElement(providerArray) as GenericLicenseProviderId,
  }),
  status: 'HasLicense',
  timeout: 100000,
  type: 'DriversLicense',
})

export const metadata = factory<GenericUserLicenseMetadata>({
  expired: () => faker.datatype.boolean(),
  licenseNumber: () => faker.datatype.number().toString(),
  title: () => title(),
})

const dataFieldType = ['Category', 'Group', 'Table', 'Value']

export const genericLicenseDataField = factory<GenericLicenseDataField>({
  description: faker.lorem.words(),
  hideFromServicePortal: faker.datatype.boolean(),
  label: faker.lorem.word(),
  name: faker.name.findName(),
  type: faker.random.arrayElement(dataFieldType) as GenericLicenseDataFieldType,
  value: faker.random.word(),
})

export const payload = () => {
  const traitArgs = {
    number: faker.datatype.number().toString(),
    name: title(),
    expires: maybeExpired(),
  }
  return factory<Payload>({
    $traits: {
      AdrLicense: {
        data: mockAdrLicense(traitArgs),
      },
      MachineLicense: {
        data: mockMachineLicense(traitArgs),
      },
      FirearmLicense: {
        data: mockFirearmLicense(traitArgs),
      },
      DriversLicense: {
        data: mockDriversLicense(traitArgs),
      },
      DisabilityLicense: {
        data: mockDisabilityLicense(traitArgs),
      },
    },
    data: [],
    metadata: () =>
      metadata({
        licenseNumber: traitArgs.number,
        title: traitArgs.number,
        expired: new Date() > new Date(traitArgs.expires),
      }),
  })
}

export const genericUserLicenses = (types?: Array<string>) => {
  const licenseTypes = types ?? ['DriversLicense']
  const licenses = licenseTypes.map((type) => genericUserLicense(type)())
  return licenses
}

export const genericUserLicense = (type: string) => {
  return factory<GenericUserLicense>({
    fetch: () => genericLicenseFetch(),
    license: () => genericLicense({ type: type as GenericLicenseType }),
    nationalId: '0000000001',
    payload: () => payload()(type),
  })
}
