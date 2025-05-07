import { Module } from '@nestjs/common'

import { LoggingModule } from '@hxm/logging'
import { TaxReturnAdminController } from './tax-return-admin.controller'
import { ITaxReturnAdminService } from './tax-return-admin.types'
import { TaxReturnAdminService } from './tax-return-admin.service'
import { TaxReturnModel } from '../tax-return/models/tax-return.tax-return.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [LoggingModule, SequelizeModule.forFeature([TaxReturnModel])],
  controllers: [TaxReturnAdminController],
  providers: [
    {
      provide: ITaxReturnAdminService,
      useClass: TaxReturnAdminService,
    },
  ],
  exports: [ITaxReturnAdminService],
})
export class TaxReturnAdminModule {}
