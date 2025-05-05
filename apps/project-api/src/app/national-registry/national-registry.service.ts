import { LOGGER_PROVIDER } from '@hxm/logging'
import { Inject } from '@nestjs/common'
import { Logger } from 'winston'
import { Result } from '../../types'
import { INationalRegistryService } from './national-registry.types'
import { GetPersonResponse } from './national-registry.dto'

export class NationalRegistryService implements INationalRegistryService {
  constructor(@Inject(LOGGER_PROVIDER) private readonly logger: Logger) {}

  async getPerson(nationalId: string): Promise<Result<GetPersonResponse>> {
    this.logger.info('NationalRegistryService.getPerson', nationalId)
    throw new Error('Method not implemented.')
  }
}
