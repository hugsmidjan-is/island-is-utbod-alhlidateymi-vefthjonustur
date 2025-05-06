import { Module } from '@nestjs/common'

import { LoggingModule } from '@hxm/logging'
import { TaxReturnAdminController } from './tax-return-admin.controller'

@Module({
  imports: [LoggingModule],
  controllers: [TaxReturnAdminController],
  providers: [],
  exports: [],
})
export class TaxReturnAdminModule {}
