import { logger } from '@hxm/logging'

import { BadRequestException, ValidationPipe } from '@nestjs/common'

export const ExceptionFactoryPipe = (apiName?: string) =>
  new ValidationPipe({
    enableDebugMessages: true,
    transform: true,
    exceptionFactory(errors) {
      const errs = errors.map((error) => {
        const target = error.target?.constructor.name
        logger.warn(
          `${apiName ? `${apiName} ` : ''}Validation error: ${target}.${
            error.property
          } received<${error.value}>`,
          {
            constraints: error.constraints,
            children: error.children,
          },
        )

        const result: Record<string, unknown> = {
          property: error.property,
          constraints: error.constraints,
        }

        if ((error?.children?.length ?? 0) > 0) {
          result.children = error.children
        }

        return result
      })
      return new BadRequestException(errs)
    },

    // stopAtFirstError: true,
  })
