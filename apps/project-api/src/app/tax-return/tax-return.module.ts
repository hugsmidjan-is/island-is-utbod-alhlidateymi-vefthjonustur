import { Module } from '@nestjs/common'

import { LoggingModule } from '@hxm/logging'

import { ITaxReturnService } from './tax-return.types'
import { TaxReturnController } from './tax-return.controller'
import { MockTaxReturnService } from './tax-return.service.mock'
import { TaxReturnService } from './tax-return.service'

@Module({
  imports: [LoggingModule],
  controllers: [TaxReturnController],
  providers: [
    {
      provide: ITaxReturnService,
      useClass:
        process.env.API_MOCK === 'true'
          ? MockTaxReturnService
          : TaxReturnService,
    },
  ],
  exports: [ITaxReturnService],
})
export class TaxReturnModule {}
