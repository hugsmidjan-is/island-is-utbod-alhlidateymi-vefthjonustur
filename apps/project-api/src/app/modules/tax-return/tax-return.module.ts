import { Module } from '@nestjs/common'

import { LoggingModule } from '@hxm/logging'

import { ITaxReturnService } from './tax-return.types'
import { TaxReturnController } from './tax-return.controller'
import { MockTaxReturnService } from './tax-return.service.mock'
import { TaxReturnService } from './tax-return.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { TaxReturnIncomeModel } from './models/income/tax-return.income.model'
import { TaxReturnModel } from './models/tax-return.tax-return.model'
import { TaxReturnIncomeTypeModel } from './models/income/tax-return.income-type.model'
import { TaxReturnIncomeLineModel } from './models/income/tax-return.income-line.model'
import { TaxReturnDebtLineModel } from './models/debt/tax-return.debt-line.model'
import { TaxReturnDebtTypeModel } from './models/debt/tax-return.debt-type.model'
import { TaxReturnDebtModel } from './models/debt/tax-return.debt.model'
import { TaxReturnPropertyLineModel } from './models/property/tax-return.property-line.model'
import { TaxReturnPropertyTypeModel } from './models/property/tax-return.property-type.model'
import { TaxReturnPropertyModel } from './models/property/tax-return.property.model'

@Module({
  imports: [
    LoggingModule,
    SequelizeModule.forFeature([
      TaxReturnModel,
      TaxReturnIncomeModel,
      TaxReturnIncomeTypeModel,
      TaxReturnIncomeLineModel,
      TaxReturnDebtModel,
      TaxReturnDebtTypeModel,
      TaxReturnDebtLineModel,
      TaxReturnPropertyModel,
      TaxReturnPropertyTypeModel,
      TaxReturnPropertyLineModel,
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
