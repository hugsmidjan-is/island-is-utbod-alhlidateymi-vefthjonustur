import { TaxReturnDebtModel } from './models/debt/tax-return.debt.model'
import { TaxReturnIncomeModel } from './models/income/tax-return.income.model'
import { TaxReturnPropertyModel } from './models/property/tax-return.property.model'
import { TaxReturnModel } from './models/tax-return.tax-return.model'

export interface ITaxReturnService {
  getTaxReturn(nationalId: string, year: string): Promise<TaxReturnModel>
  getIncomePrefill(taxReturnId: string): Promise<TaxReturnIncomeModel>
  getDebtPrefill(taxReturnId: string): Promise<TaxReturnDebtModel>
  getPropertyPrefill(taxReturnId: string): Promise<TaxReturnPropertyModel>
}

export const ITaxReturnService = Symbol('ITaxReturnService')
