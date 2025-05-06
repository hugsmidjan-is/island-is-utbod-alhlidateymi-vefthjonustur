import { Logger, LOGGER_PROVIDER } from '@hxm/logging'
import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { INationalRegistryService } from './national-registry.types'
import { GetPersonResponse } from './dto/national-registry.response.dto'
import { NationalIdPipe } from '@hxm/pipelines'
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
} from 'apps/national-registry/src/types/responses'

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
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async getPerson(
    @Param('nationalId', NationalIdPipe) nationalId: string,
  ): Promise<GetPersonResponse> {
    const result = await this.nationalRegistryService.getPerson(nationalId)

    if (!result.ok) {
      this.logger.error('Could not get person', { error: result.error })
      throw new InternalServerErrorException(result.error.message)
    }
    return result.value
  }
}
