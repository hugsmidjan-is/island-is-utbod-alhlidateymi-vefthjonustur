import { Module } from '@nestjs/common'

import { LoggingModule } from '@hxm/logging'
import { MockNationalRegistryService } from './national-registry.service.mock'
import { NationalRegistryService } from './national-registry.service'
import { INationalRegistryService } from './national-registry.types'
import { NationalRegistryController } from './national-registry.controller'

@Module({
  imports: [LoggingModule],
  controllers: [NationalRegistryController],
  providers: [
    {
      provide: INationalRegistryService,
      useClass:
        process.env.API_MOCK === 'true'
          ? MockNationalRegistryService
          : NationalRegistryService,
    },
  ],
  exports: [INationalRegistryService],
})
export class NationalRegistryModule {}
