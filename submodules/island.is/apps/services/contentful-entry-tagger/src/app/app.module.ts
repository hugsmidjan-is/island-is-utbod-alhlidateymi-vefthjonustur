import { LoggingModule } from '@island.is/logging'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppMiddleware } from './app.middleware'
import { AppRepository } from './app.repository'
import { AppService } from './app.service'
import { HealthController } from './health.controller'

@Module({
  imports: [LoggingModule],
  controllers: [AppController, HealthController],
  providers: [AppService, AppRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('entry-created')
  }
}
