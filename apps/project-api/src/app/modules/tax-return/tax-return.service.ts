import { LOGGER_PROVIDER } from '@hxm/logging'
import { Inject } from '@nestjs/common'
import { Logger } from 'winston'
import { Result } from '../../../types/types'
import { GetPersonPrefillResponse, ITaxReturnService } from './tax-return.types'

export class TaxReturnService implements ITaxReturnService {
  constructor(@Inject(LOGGER_PROVIDER) private readonly logger: Logger) {}
  getPersonPrefill(
    nationalId: string,
  ): Promise<Result<GetPersonPrefillResponse>> {
    this.logger.info('TaxReturnService.getPerson', nationalId)
    throw new Error('Method not implemented.')
  }
}
