import { Logger, LOGGER_PROVIDER } from '@hxm/logging'
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ITaxReturnService } from './tax-return.types'
import {
  BadRequestResponse,
  NotFoundResponse,
  InternalServerErrorResponse,
} from 'apps/project-api/src/types/responses'
import { IsStringValidationPipe, NationalIdPipe } from '@hxm/pipelines'
import {
  GetPersonPrefillResponse,
  PostPersonSubmitResponse,
} from './dto/tax-return.response.dto'
import { PersonPrefill } from './dto/tax-return.person-prefill.dto'
import { TaxReturnIncome } from './dto/income/tax-return.income.dto'
import { TaxReturnIncomeLine } from './dto/income/tax-return.income-line.dto'
import { SubmitTaxReturnBody } from './dto/tax-return.submit-body.dto'
import { TaxReturnIncomeModel } from './models/income/tax-return.income.model'
import { TaxReturnDebtModel } from './models/debt/tax-return.debt.model'
import { TaxReturnDebt } from './dto/debt/tax-return.debt.dto'
import { TaxReturnDebtLine } from './dto/debt/tax-return.debt-line.dto'

@Controller({
  version: '1',
})
@ApiTags('Tax Return public API')
export class TaxReturnController {
  constructor(
    @Inject(ITaxReturnService)
    private readonly TaxReturnService: ITaxReturnService,
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
  ) {}

  mapIncomePrefillToResponse(
    incomePrefill: TaxReturnIncomeModel,
  ): TaxReturnIncome {
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
    return income
  }

  mapDebtPrefillToResponse(debtPrefill: TaxReturnDebtModel): TaxReturnDebt {
    const debt: TaxReturnDebt = {
      id: debtPrefill.id,
      type: debtPrefill.type,
      debtLines: debtPrefill.debtLines.map((line) => {
        const mapped: TaxReturnDebtLine = {
          id: line.id,
          debtType: line.debtType,
          label: line.label,
          outstandingPrincipal: line.outstandingPrincipal,
          originationDate: line.originationDate,
          identifier: line.identifier,
          term: line.term,
          interestAmount: line.interestAmount,
          annualTotalPayment: line.annualTotalPayment,
          annualTotalPrincipalPayment: line.annualTotalPrincipalPayment,
          creditorId: line.creditorId,
          currency: line.currency,
        }

        return mapped
      }),
    }
    return debt
  }

  @Get('/tax-return/prefill/:nationalId/:year')
  @ApiOperation({
    operationId: 'getTaxReturnPrefillByNationalIdAndYear',
    summary: 'Get tax return prefill for a person',
    description: `Given a national ID and year, returns the tax return prefill.

This endpoint is used by the tax return frontend to get prefilled data for the tax return form.

If no prefill is found, returns 404.`,
  })
  @ApiResponse({ status: 200, type: GetPersonPrefillResponse })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async taxReturnPrefill(
    @Param('nationalId', NationalIdPipe) nationalId: string,
    @Param('year', IsStringValidationPipe) year: string,
  ): Promise<GetPersonPrefillResponse> {
    const taxReturn = await this.TaxReturnService.getTaxReturn(nationalId, year)
    const { id } = taxReturn
    const incomePrefill = await this.TaxReturnService.getIncomePrefill(id)
    const debtPrefill = await this.TaxReturnService.getDebtPrefill(id)

    const prefill: PersonPrefill = {
      nationalId: taxReturn.nationalId,
      income: this.mapIncomePrefillToResponse(incomePrefill),
      debt: this.mapDebtPrefillToResponse(debtPrefill),
    }

    return {
      prefill,
    }
  }

  @Post('/tax-return/submit/:nationalId/:year')
  @ApiOperation({ operationId: 'submitTaxReturnByNationalIdAndYear' })
  @ApiResponse({ status: 200, type: PostPersonSubmitResponse })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async taxReturnSubmit(@Body() body: SubmitTaxReturnBody) {
    this.logger.info('TaxReturnController.taxReturnSubmit', body)
    throw new InternalServerErrorException(
      'Tax return submit not implemented yet',
    )
  }
}
