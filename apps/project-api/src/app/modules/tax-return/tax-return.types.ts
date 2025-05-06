import { TaxReturnIncomeModel } from './models/tax-return.income.model'
import { TaxReturnModel } from './models/tax-return.tax-return.model'

export interface ITaxReturnService {
  getTaxReturn(nationalId: string, year: string): Promise<TaxReturnModel>
  getIncomePrefill(taxReturnId: string): Promise<TaxReturnIncomeModel>
}

export const ITaxReturnService = Symbol('ITaxReturnService')
