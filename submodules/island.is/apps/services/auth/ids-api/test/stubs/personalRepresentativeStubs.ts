import type {
  ApiScope,
  PersonalRepresentative,
  PersonalRepresentativeRight,
  PersonalRepresentativeRightType,
  PersonalRepresentativeScopePermission,
} from '@island.is/auth-api-lib'
import faker from 'faker'
import { CreationAttributes } from 'sequelize'
import { uuid } from 'uuidv4'

import { AuthDelegationType } from '@island.is/shared/types'

import { getFakeNationalId } from './genericStubs'

export const personalRepresentativeType = {
  code: 'prTypeCode',
  name: 'prTypeName',
  description: 'prTypeDescription',
}

export const getPersonalRepresentativeRelationship = (
  nationalIdPersonalRepresentative = getFakeNationalId(),
  nationalIdRepresentedPerson = getFakeNationalId(),
  id = uuid(),
  validTo = faker.date.future(10),
  created = faker.date.recent(),
): Pick<
  PersonalRepresentative,
  | 'id'
  | 'nationalIdPersonalRepresentative'
  | 'nationalIdRepresentedPerson'
  | 'validTo'
  | 'created'
  | 'modified'
  | 'personalRepresentativeTypeCode'
  | 'contractId'
  | 'externalUserId'
> => ({
  id,
  nationalIdPersonalRepresentative,
  nationalIdRepresentedPerson,
  validTo,
  created,
  modified: undefined,
  personalRepresentativeTypeCode: personalRepresentativeType.code,
  contractId: id,
  externalUserId: id,
})

export const getPersonalRepresentativeRightType = (
  code = faker.random.word(),
  validFrom = faker.date.recent(),
  validTo = faker.date.future(10),
  description = faker.random.words(),
  created = faker.date.recent(),
): Partial<PersonalRepresentativeRightType> => ({
  code,
  description,
  validFrom,
  validTo,
  created,
  modified: undefined,
})

export const getPersonalRepresentativeRights = (
  rightTypeCode: string,
  personalRepresentativeId: string,
  created = faker.date.recent(),
): Partial<PersonalRepresentativeRight> => ({
  rightTypeCode,
  personalRepresentativeId,
  created,
  modified: undefined,
})

export const getPRenabledApiScope = (
  domainName: string,
  enabled = true,
  name = faker.random.word(),
): CreationAttributes<ApiScope> => ({
  enabled,
  name,
  displayName: name,
  description: faker.random.words(),
  domainName: domainName,
  grantToPersonalRepresentatives: true,
  grantToLegalGuardians: false,
  grantToProcuringHolders: false,
  allowExplicitDelegationGrant: false,
  automaticDelegationGrant: false,
  alsoForDelegatedUser: false,
})

export const getScopePermission = (
  rightTypeCode: string,
  apiScopeName: string,
): Partial<PersonalRepresentativeScopePermission> => ({
  rightTypeCode,
  apiScopeName,
  id: uuid(),
})

export default {
  personalRepresentativeType,
  getPersonalRepresentativeRelationship,
  getPersonalRepresentativeRightType,
  getPersonalRepresentativeRights,
  getPRenabledApiScope,
  getScopePermission,
}

export const delegationTypes = [
  AuthDelegationType.PersonalRepresentative + ':valid1',
  AuthDelegationType.PersonalRepresentative + ':valid2',
  AuthDelegationType.PersonalRepresentative + ':unactivated',
  AuthDelegationType.PersonalRepresentative + ':outdated',
]
