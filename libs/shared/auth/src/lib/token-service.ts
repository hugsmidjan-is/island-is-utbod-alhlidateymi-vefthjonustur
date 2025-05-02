import { decode } from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { logger } from '@hxm/logging'

import { identityServerConfig } from './identityServerConfig'

const LOGGING_CATEGORY = 'refreshAccessToken'

const renewalSeconds = 10 // seconds

export const isExpired = (
  accessToken: string,
  isRefreshTokenExpired: boolean,
) => {
  const decoded = decode(accessToken)

  if (decoded && !(typeof decoded === 'string') && decoded['exp']) {
    const expires = new Date(decoded.exp * 1000)
    const renewalTime = new Date(expires.getTime() - renewalSeconds * 1000)
    return new Date() > renewalTime && !isRefreshTokenExpired
  }

  return false
}

export const refreshAccessToken = async (token: JWT) => {
  try {
    if (!token.refreshToken) {
      logger.error('Refresh token missing', {
        error: 'RefreshTokenMissing',
        category: LOGGING_CATEGORY,
      })
      return { ...token, error: 'RefreshTokenMissing', invalid: true }
    }

    const response = await fetch(
      `https://${process.env.IDENTITY_SERVER_DOMAIN}/connect/token`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: new URLSearchParams({
          client_id: identityServerConfig.clientId,
          client_secret: identityServerConfig.clientSecret,
          grant_type: 'refresh_token',
          redirect_uri: process.env.IDENTITY_SERVER_LOGOUT_URL ?? '',
          refresh_token: token.refreshToken as string,
        }),
      },
    )
    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }
    const newTokens = refreshedTokens as {
      access_token: string
      id_token: string
      refresh_token?: string
      expires_in: number
    }

    const expiresIn = Math.floor(Date.now() + newTokens.expires_in * 1000)

    logger.info('Token refreshed', {
      metadata: {
        timeNow: new Date().toISOString(),
        prevExpires: new Date(token.exp as number).toISOString(),
        newExpires: new Date(expiresIn).toISOString(),
      },
      category: LOGGING_CATEGORY,
    })

    if (!newTokens.access_token || !newTokens.id_token) {
      logger.error('Access token or ID token missing', {
        error: 'AccessTokenOrIdTokenMissing',
        category: LOGGING_CATEGORY,
      })
      return { ...token, error: 'AccessTokenOrIdTokenMissing', invalid: true }
    }

    return {
      ...token,
      accessToken: newTokens.access_token,
      idToken: newTokens.id_token,
      refreshToken: newTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    logger.error('Refreshing failed', {
      error: error as Error,
      category: LOGGING_CATEGORY,
    })
    return { ...token, error: 'RefreshAccessTokenError', invalid: true }
  }
}
