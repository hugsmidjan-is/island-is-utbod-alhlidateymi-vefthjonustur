import { ApolloError, ServerError } from '@apollo/client'
import { onError, ErrorResponse } from '@apollo/client/link/error'

import { NotificationService } from '@island.is/financial-aid-web/veita/src/services'
import { identityServerId, Routes } from '@island.is/financial-aid/shared/lib'
import { signIn } from 'next-auth/client'

export default onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (networkError) {
    return NotificationService.onNetworkError(networkError as ServerError)
  }

  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      if (err.message === 'Unauthorized') {
        return signIn(identityServerId, {
          callbackUrl: `${window.location.href}`,
        })
      }
      switch (err.extensions?.code) {
        case 'UNAUTHENTICATED':
          return signIn(identityServerId, {
            callbackUrl: `${window.location.origin}${Routes.newCases}`,
          })
        default:
          return NotificationService.onGraphQLError({
            graphQLErrors,
          } as ApolloError)
      }
    })
  }
})
