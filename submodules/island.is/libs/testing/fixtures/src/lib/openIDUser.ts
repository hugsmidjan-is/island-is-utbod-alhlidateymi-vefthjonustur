/* eslint-disable @typescript-eslint/naming-convention */

import * as faker from 'faker'
import kennitala from 'kennitala'

import { User } from '@island.is/shared/types'
import { createNationalId } from './nationalId'

const createRandomOpenIDUser = (): User => {
  const [firstName, middleName, lastName] = [
    faker.name.firstName(),
    faker.name.middleName(),
    faker.name.lastName(),
  ]
  const nationalId = createNationalId()
  const subjectType = kennitala.isCompany(nationalId) ? 'legalEntity' : 'person'

  return {
    id_token: faker.random.word(),
    access_token: faker.random.word(),
    token_type: faker.random.word(),
    scope: faker.random.word(),
    profile: {
      name: `${firstName} ${middleName} ${lastName}`,
      nationalId,
      subjectType,
      given_name: firstName,
      family_name: lastName,
      nickname: faker.name.firstName(),
      preferred_username: faker.internet.userName(),
      profile: faker.internet.avatar(),
      picture: faker.internet.avatar(),
      phone_number: faker.phone.phoneNumber('#######'),
      phone_number_verified: faker.datatype.boolean(),
      email: faker.internet.email(),
      iss: faker.random.word(),
      sub: faker.random.word(),
      aud: faker.random.word(),
      exp: faker.datatype.number(),
      iat: faker.datatype.number(),
      nat: faker.random.word(),
      idp: faker.random.word(),
      nonce: faker.random.word(),
    },
    expires_at: faker.datatype.number(),
    state: faker.random.word(),
    session_state: faker.random.word(),
    toStorageString: () => '',
    expires_in: faker.datatype.number(),
    expired: faker.datatype.boolean(),
    scopes: [],
  }
}

export const createOpenIDUser = (
  user: User = createRandomOpenIDUser(),
): User => {
  const fallback = createRandomOpenIDUser()

  const {
    id_token = user['id_token'] ?? fallback['id_token'],
    access_token = user['access_token'] ?? fallback['access_token'],
    token_type = user['token_type'] ?? fallback['token_type'],
    scope = user['scope'] ?? fallback['scope'],
    profile = user['profile'] ?? fallback['profile'],
    expires_at = user['expires_at'] ?? fallback['expires_at'],
    state = user['state'] ?? fallback['state'],
    toStorageString = user['toStorageString'] ?? fallback['toStorageString'],
    expires_in = user['expires_in'] ?? fallback['expires_in'],
    expired = user['expired'] ?? fallback['expired'],
    scopes = user['scopes'] ?? fallback['scopes'],
    session_state = user['session_state'] ?? fallback['session_state'],
  } = user

  return {
    id_token,
    access_token,
    token_type,
    scope,
    profile,
    expires_at,
    state,
    toStorageString,
    expires_in,
    expired,
    scopes,
    session_state,
  }
}
