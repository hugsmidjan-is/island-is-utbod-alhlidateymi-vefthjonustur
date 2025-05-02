import { EinstaklingurDTOAllt } from '@island.is/clients/national-registry-v3'
import { registerEnumType } from '@nestjs/graphql'
import { Person } from './models'
import { ChildCustody } from './models/childCustody.model'

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  TRANSGENDER = 'transgender',
  MALE_MINOR = 'male-minor',
  FEMALE_MINOR = 'female-minor',
  TRANSGENDER_MINOR = 'transgender-minor',
  UNKNOWN = 'unknown',
}

export enum NationalIdType {
  NATIONAL_REGISTRY_NATIONAL_ID = 'national-registry-national-id',
  SYSTEM_NATIONAL_ID = 'system-national-id',
  DECEASED = 'deceased',
  UNKNOWN = 'unknown',
}

export enum MaritalStatus {
  UNMARRIED = 'unmarried',
  MARRIED = 'married',
  WIDOWED = 'widowed',
  SEPARATED = 'separated',
  DIVORCED = 'divorced',
  MARRIED_LIVING_SEPARATELY = 'married-living-separately',
  MARRIED_TO_FOREIGN_LAW_PERSON = 'registered-married-to-foreign-law-person',
  UNKNOWN = 'unknown',
  FOREIGN_RESIDENCE_MARRIED_TO_UNREGISTERED_PERSON = 'foreign-residence-married-to-unregistered-person',
  ICELANDIC_RESIDENCE_MARRIED_TO_UNREGISTERED_PERSON = 'transnational-marriage',
}

registerEnumType(Gender, { name: 'NationalRegistryGender' })
registerEnumType(NationalIdType, { name: 'NationalRegistryNationalIdType' })
registerEnumType(MaritalStatus, {
  name: 'NationalRegistryMaritalStatus',
})
export type PersonV3 = Person & {
  api: 'v3'
  useFakeData?: boolean
  rawData?: EinstaklingurDTOAllt | null
}

export type SharedPerson = PersonV3

export type ChildCustodyV3 = ChildCustody & {
  api: 'v3'
  useFakeData?: boolean
}

export type SharedChildCustody = ChildCustodyV3
