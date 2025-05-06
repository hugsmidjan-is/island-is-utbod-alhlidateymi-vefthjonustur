import { Logger, LOGGER_PROVIDER } from '@hxm/logging'
import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ITaxReturnService } from './tax-return.types'
import {
  BadRequestResponse,
  NotFoundResponse,
  InternalServerErrorResponse,
} from 'apps/project-api/src/types/responses'
import { IsStringValidationPipe, NationalIdPipe } from '@hxm/pipelines'
import { GetPersonPrefillResponse } from './dto/tax-return.response.dto'
import { PersonPrefill } from './dto/tax-return.person-prefill.dto'
import { TaxReturnIncome } from './dto/tax-return.income.dto'
import { TaxReturnIncomeLine } from './dto/tax-return.income-line.dto'

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

  @Get('/tax-return/prefill/:nationalId/:year')
  @ApiOperation({ operationId: 'getTaxReturnPrefillByNationalIdAndYear' })
  @ApiResponse({ status: 200, type: GetPersonPrefillResponse })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async taxReturnPrefill(
    @Param('nationalId', NationalIdPipe) nationalId: string,
    @Param('year', IsStringValidationPipe) year: string,
  ): Promise<GetPersonPrefillResponse> {
    const taxReturn = await this.TaxReturnService.getTaxReturn(nationalId, year)

    const incomePrefill = await this.TaxReturnService.getIncomePrefill(
      taxReturn.id,
    )

    const income: TaxReturnIncome = {
      id: incomePrefill.id,
      type: incomePrefill.type,
      incomeLines: incomePrefill.incomeLines.map((line) => {
        const mapped: TaxReturnIncomeLine = {
          id: line.id,
          incomeType: line.incomeType,
          label: line.label,
          value: line.value,
        }

        if (line.payer) {
          mapped.payer = line.payer
        }

        return mapped
      }),
    }
    const prefill: PersonPrefill = {
      nationalId: taxReturn.nationalId,
      income,
    }

    return {
      prefill,
    }
  }
}
