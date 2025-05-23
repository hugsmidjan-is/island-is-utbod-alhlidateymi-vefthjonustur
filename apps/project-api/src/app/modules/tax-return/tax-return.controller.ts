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
  TaxReturnCreate,
} from './dto/tax-return.response.dto'
import { PersonPrefill } from './dto/tax-return.person-prefill.dto'
import { TaxReturnIncome } from './dto/income/tax-return.income.dto'
import { TaxReturnIncomeLine } from './dto/income/tax-return.income-line.dto'
import { SubmitTaxReturnBody } from './dto/tax-return.submit-body.dto'
import { TaxReturnIncomeModel } from './models/income/tax-return.income.model'
import { TaxReturnDebtModel } from './models/debt/tax-return.debt.model'
import { TaxReturnDebt } from './dto/debt/tax-return.debt.dto'
import { TaxReturnDebtLine } from './dto/debt/tax-return.debt-line.dto'
import { TaxReturnPropertyModel } from './models/property/tax-return.property.model'
import { TaxReturnProperty } from './dto/property/tax-return.property.dto'
import { TaxReturnPropertyLine } from './dto/property/tax-return.property-line.dto'
import { TaxReturnTypes } from './dto/tax-return.types.dto'

@Controller({
  version: '1',
})
@ApiTags('Tax Return public API')
export class TaxReturnController {
  constructor(
    @Inject(ITaxReturnService)
    private readonly taxReturnService: ITaxReturnService,
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
  ) {}

  /**
   * Map income prefill from the database to the response DTO.
   * Very simple mapping, but we need to do it to make sure the response is
   * correct and to avoid exposing the database model.
   * @param incomePrefill Model from the database
   * @returns Dto for the response
   */
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

  /**
   * Map debt prefill from the database to the response DTO.
   * @param debtPrefill Model from the database
   * @returns Dto for the response
   */
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
          originationDate: line.originationDate?.toString(),
          identifier: line.identifier,
          term: line.term,
          interestAmount: line.interestAmount,
          annualTotalPayment: line.annualTotalPayment,
          annualTotalPrincipalPayment: line.annualTotalPrincipalPayment,
          creditorId: line.creditorId,
          creditorName: line.creditorName,
          writeDown: line.writeDown,
          currency: line.currency,
          ratio: line.ratio,
        }

        return mapped
      }),
    }
    return debt
  }

  mapPropertyPrefillToResponse(
    propertyPrefill: TaxReturnPropertyModel,
  ): TaxReturnProperty {
    const property: TaxReturnProperty = {
      id: propertyPrefill.id,
      type: propertyPrefill.type,
      propertyLines: propertyPrefill.propertyLines.map((line) => {
        const mapped: TaxReturnPropertyLine = {
          id: line.id,
          label: line.label,
          identifier: line.identifier,
          value: line.value,
          currency: line.currency,
          propertyType: line.propertyType,
        }

        return mapped
      }),
    }
    return property
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
    const taxReturn = await this.taxReturnService.getTaxReturn(nationalId, year)
    const { id } = taxReturn
    const incomePrefill = await this.taxReturnService.getIncomePrefill(id)
    const debtPrefill = await this.taxReturnService.getDebtPrefill(id)
    const propertyPrefill = await this.taxReturnService.getPropertyPrefill(id)

    const prefill: PersonPrefill = {
      nationalId: taxReturn.nationalId,
      year: taxReturn.year,
      income: this.mapIncomePrefillToResponse(incomePrefill),
      debt: this.mapDebtPrefillToResponse(debtPrefill),
      property: this.mapPropertyPrefillToResponse(propertyPrefill),
    }

    return {
      prefill,
    }
  }

  @Post('/tax-return/submit/:nationalId/:year')
  @ApiOperation({
    operationId: 'submitTaxReturnByNationalIdAndYear',
    summary: 'Submit tax return for a person',
  })
  @ApiResponse({ status: 201, type: TaxReturnCreate })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async taxReturnSubmit(
    @Param('nationalId', NationalIdPipe) nationalId: string,
    @Param('year', IsStringValidationPipe) year: string,
    @Body() body: SubmitTaxReturnBody,
  ): Promise<TaxReturnCreate> {
    const result = await this.taxReturnService.createTaxReturn(
      nationalId,
      year,
      body,
    )

    const response: TaxReturnCreate = {
      nationalId: result.nationalId,
      year: result.year,
      id: result.id,
      timestamp: result.submittedAt!,
    }

    return response
  }

  @Get('/tax-return/types/')
  @ApiOperation({
    operationId: 'getTaxReturnTypes',
    summary: 'Get tax return types (income, debt and property)',
    description: `Will fetch all data pertaining to income, debt and property types`,
  })
  @ApiResponse({ status: 200, type: GetPersonPrefillResponse })
  @ApiResponse({ status: 400, type: BadRequestResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerErrorResponse })
  async getTaxReturnTypes(): Promise<TaxReturnTypes> {
    const taxReturnTypes = await this.taxReturnService.getTaxReturnTypes()

    return taxReturnTypes
  }
}
