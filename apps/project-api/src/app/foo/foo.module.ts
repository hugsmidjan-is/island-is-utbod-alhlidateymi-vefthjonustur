import { Module } from '@nestjs/common'

import { FooController } from './foo.controller'
import { IFooService } from '../../services/IFooService'
import { FooService } from './foo.service'
import { MockFooService } from './foo.service.mock'
import { LoggingModule } from '@hxm/logging'

@Module({
  imports: [LoggingModule],
  controllers: [FooController],
  providers: [
    {
      provide: IFooService,
      useClass: process.env.API_MOCK === 'true' ? MockFooService : FooService,
    },
  ],
  exports: [IFooService],
})
export class FooModule {}
