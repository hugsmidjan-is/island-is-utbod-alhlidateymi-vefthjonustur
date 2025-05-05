import { Logger, LOGGER_PROVIDER } from '@hxm/logging'
import { Controller, Get, Inject, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetPersonPrefillResponse, ITaxReturnService } from './tax-return.types'

@Controller({
  version: '1',
})
@ApiTags('Tax Return')
export class TaxReturnController {
  constructor(
    @Inject(ITaxReturnService)
    private readonly TaxReturnService: ITaxReturnService,
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/tax-return/prefill/:nationalId')
  @ApiOperation({ operationId: 'getTaxReturnPrefillByNationalId' })
  @ApiResponse({ status: 200, type: GetPersonPrefillResponse })
  async advert(
    @Param('nationalId') nationalId: string,
  ): Promise<GetPersonPrefillResponse> {
    const result = await this.TaxReturnService.getPersonPrefill(nationalId)

    if (!result.ok) {
      this.logger.error('Could not get person', {
        error: result.error,
      })
      throw new Error(result.error.message)
    }
    return result.value
  }
}
