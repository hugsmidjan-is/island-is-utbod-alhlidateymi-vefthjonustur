import { Module } from '@nestjs/common'

import { LoggingModule } from '@hxm/logging'

import { ITaxReturnService } from './tax-return.types'
import { TaxReturnController } from './tax-return.controller'
import { MockTaxReturnService } from './tax-return.service.mock'
import { TaxReturnService } from './tax-return.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { TaxReturnIncomeModel } from './models/tax-return.income.model'
import { TaxReturnModel } from './models/tax-return.tax-return.model'
import { TaxReturnIncomeTypeModel } from './models/tax-return.income-type.model'
import { TaxReturnIncomeLineModel } from './models/tax-return.income-line.model'

@Module({
  imports: [
    LoggingModule,
    SequelizeModule.forFeature([
      TaxReturnModel,
      TaxReturnIncomeModel,
      TaxReturnIncomeTypeModel,
      TaxReturnIncomeLineModel,
    ]),
  ],
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
