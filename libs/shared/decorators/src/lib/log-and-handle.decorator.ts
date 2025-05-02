/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@hxm/logging'
import { filterArgs, handleException } from '@hxm/utils'

type LogAndHandleOptions = {
  logArgs?: boolean
  message?: string
}

export function LogAndHandle(
  { logArgs, message }: LogAndHandleOptions = {
    logArgs: true,
    message: 'Internal server error',
  },
) {
  return function (
    target: any,
    method: string,
    descriptor: PropertyDescriptor,
  ) {
    const service = target.constructor.name
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      try {
        const filteredArgs = filterArgs(args, service, method)
        const logData = {
          context: `${service}`,
          method: method,
          category: service,
        }

        if (!logArgs) {
          logger.debug(`${method} called (skipped logging args)`, {
            context: `${service}`,
          })
        }

        if (logArgs) {
          Object.assign(logData, {
            ...filteredArgs,
          })
          logger.debug(`${method} called with arguments`, {
            ...logData,
          })
        }
        return await originalMethod.apply(this, args)
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('error', error)
        }

        return handleException({
          service: service,
          method: method,
          error: error,
        })
      }
    }
    return descriptor
  }
}
