import { ApiProperty } from '@nestjs/swagger'
import { TaxReturnDebtTypeModel } from '../models/debt/tax-return.debt-type.model'
import { TaxReturnIncomeTypeModel } from '../models/income/tax-return.income-type.model'
import { TaxReturnPropertyTypeModel } from '../models/property/tax-return.property-type.model'

export class TaxReturnTypes {
  constructor(
    propertyTypes: TaxReturnPropertyTypeModel[],
    debtTypes: TaxReturnDebtTypeModel[],
    incomeTypes: TaxReturnIncomeTypeModel[],
  ) {
    this.propertyTypes = propertyTypes
    this.debtTypes = debtTypes
    this.incomeTypes = incomeTypes
  }
  @ApiProperty({ type: TaxReturnPropertyTypeModel })
  propertyTypes!: TaxReturnPropertyTypeModel[]

  @ApiProperty({ type: TaxReturnDebtTypeModel })
  debtTypes!: TaxReturnDebtTypeModel[]

  @ApiProperty({ type: TaxReturnIncomeTypeModel })
  incomeTypes!: TaxReturnIncomeTypeModel[]
}
