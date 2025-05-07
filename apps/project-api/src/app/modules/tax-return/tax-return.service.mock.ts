import { LOGGER_PROVIDER } from '@hxm/logging'
import { Inject } from '@nestjs/common'
import { Logger } from 'winston'
import { Result } from '../../../types/types'
import { ITaxReturnService } from './tax-return.types'
import { TaxReturnModel } from './models/tax-return.tax-return.model'
import { TaxReturnIncomeModel } from './models/income/tax-return.income.model'
import { GetPersonPrefillResponse } from './dto/tax-return.response.dto'
import { TaxReturnDebtModel } from './models/debt/tax-return.debt.model'
import { TaxReturnPropertyModel } from './models/property/tax-return.property.model'
import { SubmitTaxReturnBody } from './dto/tax-return.submit-body.dto'

export class MockTaxReturnService implements ITaxReturnService {
  constructor(@Inject(LOGGER_PROVIDER) private readonly logger: Logger) {}
  createTaxReturn(
    nationalId: string,
    year: string,
    body: SubmitTaxReturnBody,
  ): Promise<TaxReturnModel> {
    throw new Error('Method not implemented.')
  }
  getPropertyPrefill(taxReturnId: string): Promise<TaxReturnPropertyModel> {
    throw new Error('Method not implemented.')
  }
  getDebtPrefill(taxReturnId: string): Promise<TaxReturnDebtModel> {
    throw new Error('Method not implemented.')
  }
  getIncomePrefill(taxReturnId: string): Promise<TaxReturnIncomeModel> {
    throw new Error('Method not implemented.')
  }
  getTaxReturn(nationalId: string): Promise<TaxReturnModel> {
    throw new Error('Method not implemented.')
  }
  getPersonPrefill(
    nationalId: string,
  ): Promise<Result<GetPersonPrefillResponse>> {
    throw new Error('Method not implemented.')
  }
}
