import { Logger, LOGGER_PROVIDER } from '@hxm/logging'
import { Controller, Get, Inject, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { INationalRegistryService } from './national-registry.types'
import { GetPersonResponse } from './national-registry.dto'

@Controller({
  version: '1',
})
@ApiTags('National Registry')
export class NationalRegistryController {
  constructor(
    @Inject(INationalRegistryService)
    private readonly nationalRegistryService: INationalRegistryService,
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/person/:nationalId')
  @ApiOperation({ operationId: 'getPersonByNationalId' })
  @ApiResponse({ status: 200, type: GetPersonResponse })
  async advert(
    @Param('nationalId') nationalId: string,
  ): Promise<GetPersonResponse> {
    const result = await this.nationalRegistryService.getPerson(nationalId)

    if (!result.ok) {
      this.logger.error('Could not get person', {
        error: result.error,
        category: 'foo',
        context: 'getFooById',
      })
      throw new Error(result.error.message)
    }
    return result.value
  }
}
