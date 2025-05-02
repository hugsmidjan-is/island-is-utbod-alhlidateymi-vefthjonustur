import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { apiBasePath } from '@island.is/financial-aid/shared/lib'
import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { OpenApiApplicationService } from './openApiApplication.service'
import { ApiKeyGuard } from '../../guards/apiKey.guard'
import { CurrentMunicipalityCode } from '../../decorators/apiKey.decorator'
import { ApplicationState } from '@island.is/financial-aid/shared/lib'
import { ApplicationModel } from '../application'
import { PdfApplicationResponse } from './pdfApplication.response'

@Controller(`${apiBasePath}/open-api-applications`)
@UseGuards(ApiKeyGuard)
@ApiTags('application')
export class OpenApiApplicationController {
  constructor(
    private readonly applicationService: OpenApiApplicationService,
    @Inject(LOGGER_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @Get('getAll')
  @ApiOkResponse({
    type: ApplicationModel,
    isArray: true,
    description: 'Gets all existing applications',
  })
  async getAll(
    @CurrentMunicipalityCode() municipalityCode: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('state') state?: ApplicationState,
  ) {
    this.logger.info(
      `${municipalityCode} fetched all applications from ${startDate} to ${endDate} ${
        state && `with state ${state}`
      }`,
    )
    return this.applicationService.getAll(
      municipalityCode,
      startDate,
      endDate,
      state,
    )
  }

  @Get('id/:id')
  @ApiOkResponse({
    type: PdfApplicationResponse,
    description: 'Get application',
  })
  async getApplicationPdfById(
    @Param('id') id: string,
    @CurrentMunicipalityCode() municipalityCode: string,
  ) {
    this.logger.info(
      `Open api Application controller: Getting application by id ${id}`,
    )

    return this.applicationService.getApplicationPdfById(municipalityCode, id)
  }
}
