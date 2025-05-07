import { Logger, LOGGER_PROVIDER } from '@hxm/logging'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  BadRequestResponse,
  NotFoundResponse,
  InternalServerErrorResponse,
} from 'apps/project-api/src/types/responses'
import { IsStringValidationPipe, NationalIdPipe } from '@hxm/pipelines'

@Controller({
  version: '1',
})
@ApiTags('Tax Return admin API')
export class TaxReturnAdminController {
  constructor(@Inject(LOGGER_PROVIDER) private readonly logger: Logger) {}

  @Get('/admin/tax-return/')
  @ApiOperation({
    operationId: 'getTaxReturns',
    summary: 'Get all tax returns',
    description: `Returns all tax returns for all people.`,
  })
  @ApiResponse({ status: 200, type: Object })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async getTaxReturns() {
    // TODO paging
    this.logger.info('TaxReturnController.getTaxReturns')
    throw new InternalServerErrorException(
      'Tax returns get not implemented yet',
    )
  }

  @Post('/admin/tax-return/:nationalId/:year')
  @ApiOperation({
    operationId: 'createTaxReturn',
    summary: 'Create a tax return for a person',
    description: `Given a national ID, year and a body, create a tax return for that person for that year.`,
  })
  @ApiResponse({ status: 200, type: Object })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async createTaxReturn(
    @Param('nationalId', NationalIdPipe) nationalId: string,
    @Param('year', IsStringValidationPipe) year: string,
  ) {
    this.logger.info('TaxReturnController.getTaxReturn' + nationalId)
    throw new InternalServerErrorException('Tax return get not implemented yet')
  }

  @Get('/admin/tax-return/:id')
  @ApiOperation({
    operationId: 'getTaxReturnById',
    summary: 'Get a tax return by ID',
    description: `Return any tax return by ID.`,
  })
  @ApiResponse({ status: 200, type: Object })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async getTaxReturn(@Param('id', IsStringValidationPipe) id: string) {
    this.logger.info('TaxReturnController.getTaxReturn' + id)
    throw new InternalServerErrorException('Tax return get not implemented yet')
  }

  @Patch('/admin/tax-return/:id')
  @ApiOperation({
    operationId: 'patchTaxReturnById',
    summary: 'Patch a tax returns for a person by tax return ID',
    description: `Given a tax return ID and a partial body, patch (update) that tax return.`,
  })
  @ApiResponse({ status: 200, type: Object })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async patchTaxReturn(
    @Param('id', IsStringValidationPipe) id: string,
    @Body() body: Object,
  ) {
    this.logger.info('TaxReturnController.patchTaxReturn', {
      id,
    })
    throw new InternalServerErrorException(
      'Tax return patch not implemented yet',
    )
  }

  @Delete('/admin/tax-return/:id')
  @ApiOperation({
    operationId: 'deleteTaxReturnById',
    summary: 'Delete a tax returns for a person by tax return ID',
    description: `Given a tax return ID delete that tax return.`,
  })
  @ApiResponse({ status: 200, type: Object })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async deleteTaxReturn(@Param('id', IsStringValidationPipe) id: string) {
    this.logger.info('TaxReturnController.deleteTaxReturn', {
      id,
    })
    throw new InternalServerErrorException(
      'Tax return delete not implemented yet',
    )
  }
}
