import { LOGGER_PROVIDER } from '@hxm/logging'
import { Inject } from '@nestjs/common'
import { Logger } from 'winston'
import { Result } from '../../../types/types'
import { ITaxReturnService } from './tax-return.types'
import { TaxReturnModel } from './models/tax-return.tax-return.model'
import { TaxReturnIncomeModel } from './models/tax-return.income.model'
import { GetPersonPrefillResponse } from './dto/tax-return.response.dto'

export class MockTaxReturnService implements ITaxReturnService {
  constructor(@Inject(LOGGER_PROVIDER) private readonly logger: Logger) {}
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
