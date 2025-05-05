import { WinstonModule } from 'nest-winston'

import { logger } from '@hxm/logging'
import { ExceptionFactoryPipe } from '@hxm/pipelines'

import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app/app.module'
import { openApi } from './openApi'

async function bootstrap() {
  const globalPrefix = 'api'
  const version = 'v1'
  const swaggerPath = 'swagger'

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: logger }),
  })

  // TODO make this behave with nest
  // app.useLogger(logger)

  app.useGlobalPipes(ExceptionFactoryPipe())
  app.setGlobalPrefix(globalPrefix)
  app.enableVersioning({
    type: VersioningType.URI,
  })

  const document = SwaggerModule.createDocument(app, openApi)
  SwaggerModule.setup(swaggerPath, app, document)

  const port = process.env.PORT || 3000
  await app.listen(port)
  logger.info(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}/${version}/`,
  )
}

bootstrap()
