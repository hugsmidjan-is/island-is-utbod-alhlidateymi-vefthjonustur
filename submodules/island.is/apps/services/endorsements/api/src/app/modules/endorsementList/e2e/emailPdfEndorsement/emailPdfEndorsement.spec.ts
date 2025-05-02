import { EndorsementsScope } from '@island.is/auth/scopes'
import { errorExpectedStructure } from '../../../../../../test/testHelpers'
import request from 'supertest'
import { getAuthenticatedApp } from '../../../../../../test/setup'
import { authNationalId, listYouOwnListId, listYouDoNotOwnListId } from './seed'

const invalidEmail = 'NOT_A_VALID_EMAIL_ADDRESS.is'
const validEmail = 'rafn@juni.is' // valid whitelisted

describe('emailPdfEndorsement', () => {
  it(`POST /endorsement-list/:listId/email-pdf should fail trying to send list you dont own`, async () => {
    const app = await getAuthenticatedApp({
      nationalId: authNationalId,
      scope: [EndorsementsScope.main],
    })
    const response = await request(app.getHttpServer())
      .post(
        `/endorsement-list/${listYouDoNotOwnListId}/email-pdf?emailAddress=${validEmail}`,
      )
      .send()
      .expect(404)
    expect(response.body).toMatchObject({
      ...errorExpectedStructure,
      statusCode: 404,
    })
  })

  it(`POST /endorsement-list/:listId/email-pdf invalid email should fail`, async () => {
    const app = await getAuthenticatedApp({
      nationalId: authNationalId,
      scope: [EndorsementsScope.main],
    })
    const response = await request(app.getHttpServer())
      .post(
        `/endorsement-list/${listYouOwnListId}/email-pdf?emailAddress=${invalidEmail}`,
      )
      .send()
      .expect(400)

    expect(response.body).toMatchObject({
      ...errorExpectedStructure,
      statusCode: 400,
    })
  })

  it(`POST /endorsement-list/:listId/email-pdf should fail and return 403 error if scope is missing`, async () => {
    const app = await getAuthenticatedApp({
      nationalId: authNationalId,
      scope: [],
    })
    const response = await request(app.getHttpServer())
      .post(
        `/endorsement-list/${listYouOwnListId}/email-pdf?emailAddress=${validEmail}`,
      )
      .expect(403)

    expect(response.body).toMatchObject({
      ...errorExpectedStructure,
      statusCode: 403,
    })
  })
})
