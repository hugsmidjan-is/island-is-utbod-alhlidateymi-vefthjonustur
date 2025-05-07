import { LOGGER_PROVIDER } from '@hxm/logging'
import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Logger } from 'winston'
import { ITaxReturnService } from './tax-return.types'
import { TaxReturnModel } from './models/tax-return.tax-return.model'
import { InjectModel } from '@nestjs/sequelize'

import { TaxReturnDebtModel } from './models/debt/tax-return.debt.model'
import { TaxReturnDebtLineModel } from './models/debt/tax-return.debt-line.model'
import { TaxReturnDebtTypeModel } from './models/debt/tax-return.debt-type.model'
import { TaxReturnIncomeLineModel } from './models/income/tax-return.income-line.model'
import { TaxReturnIncomeTypeModel } from './models/income/tax-return.income-type.model'
import { TaxReturnIncomeModel } from './models/income/tax-return.income.model'
import { TaxReturnPropertyModel } from './models/property/tax-return.property.model'
import { TaxReturnPropertyLineModel } from './models/property/tax-return.property-line.model'
import { TaxReturnPropertyTypeModel } from './models/property/tax-return.property-type.model'
import { SubmitTaxReturnBody } from './dto/tax-return.submit-body.dto'
import { v4 as uuidv4 } from 'uuid'
import { Transaction } from 'sequelize'
import { TaxReturnIncomeLine } from './dto/income/tax-return.income-line.dto'
import { TaxReturnPropertyLine } from './dto/property/tax-return.property-line.dto'
import { TaxReturnDebtLine } from './dto/debt/tax-return.debt-line.dto'
import { TaxReturnTypes } from './dto/tax-return.types.dto'

export class TaxReturnService implements ITaxReturnService {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
    @InjectModel(TaxReturnModel)
    private taxReturnModel: typeof TaxReturnModel,
    @InjectModel(TaxReturnIncomeModel)
    private taxReturnIncomeModel: typeof TaxReturnIncomeModel,
    @InjectModel(TaxReturnDebtModel)
    private taxReturnDebtModel: typeof TaxReturnDebtModel,
    @InjectModel(TaxReturnPropertyModel)
    private taxReturnPropertyModel: typeof TaxReturnPropertyModel,
    @InjectModel(TaxReturnPropertyTypeModel)
    private taxReturnPropertyTypeModel: typeof TaxReturnPropertyTypeModel,
    @InjectModel(TaxReturnDebtTypeModel)
    private taxReturnDebtTypeModel: typeof TaxReturnDebtTypeModel,
    @InjectModel(TaxReturnIncomeTypeModel)
    private taxReturnIncomeTypeModel: typeof TaxReturnIncomeTypeModel,
  ) {}

  async getTaxReturn(
    nationalId: string,
    year: string,
  ): Promise<TaxReturnModel> {
    this.logger.info('TaxReturnService.getPerson', nationalId)

    let result
    try {
      result = await this.taxReturnModel.findOne({
        where: { nationalId, year },
      })
    } catch (e) {
      this.logger.error('error fetching tax return from database', {
        error: e,
      })
      throw new InternalServerErrorException('unexpected error')
    }

    if (!result) {
      throw new NotFoundException(`tax return not found`)
    }

    return result
  }

  async getIncomePrefill(taxReturnId: string): Promise<TaxReturnIncomeModel> {
    this.logger.info('TaxReturnService.getIncomePrefill for ' + taxReturnId)

    let result
    try {
      result = await this.taxReturnIncomeModel.findOne({
        where: { tax_return_id: taxReturnId, type: 'prefill' },
        include: [
          {
            model: TaxReturnIncomeLineModel,
            include: [TaxReturnIncomeTypeModel],
          },
        ],
      })
    } catch (e) {
      this.logger.error('error fetching income prefill from database', {
        error: e,
      })
      throw new InternalServerErrorException('unexpected error')
    }

    if (!result) {
      throw new NotFoundException(`income prefill not found`)
    }

    return result
  }

  async getDebtPrefill(taxReturnId: string): Promise<TaxReturnDebtModel> {
    this.logger.info('TaxReturnService.getDebtPrefill for ' + taxReturnId)

    let result
    try {
      result = await this.taxReturnDebtModel.findOne({
        where: { tax_return_id: taxReturnId, type: 'prefill' },
        include: [
          {
            model: TaxReturnDebtLineModel,
            include: [TaxReturnDebtTypeModel],
          },
        ],
      })
    } catch (e) {
      this.logger.error('error fetching debt prefill from database', {
        error: e,
      })
      throw new InternalServerErrorException('unexpected error')
    }

    if (!result) {
      throw new NotFoundException(`debt prefill not found`)
    }

    return result
  }

  async getPropertyPrefill(
    taxReturnId: string,
  ): Promise<TaxReturnPropertyModel> {
    this.logger.info('TaxReturnService.getPropertyPrefill for ' + taxReturnId)

    let result
    try {
      result = await this.taxReturnPropertyModel.findOne({
        where: { tax_return_id: taxReturnId, type: 'prefill' },
        include: [
          {
            model: TaxReturnPropertyLineModel,
            include: [TaxReturnPropertyTypeModel],
          },
        ],
      })
    } catch (e) {
      this.logger.error('error fetching property prefill from database', {
        error: e,
      })
      throw new InternalServerErrorException('unexpected error')
    }

    if (!result) {
      throw new NotFoundException(`property prefill not found`)
    }

    return result
  }

  /**
   * Save income lines to the database via a transaction
   * @param taxReturnId ID of the tax return
   * @param lines Income lines to save
   * @param t Transaction to use
   */
  async saveIncome(
    taxReturnId: string,
    lines: TaxReturnIncomeLine[],
    t: Transaction,
  ) {
    // TODO check if the submitted income is already in the database
    const incomeId = uuidv4()
    const income = await this.taxReturnIncomeModel.create(
      {
        id: incomeId,
        tax_return_id: taxReturnId,
        type: 'submit',
        incomeLines: lines.map((line) => ({
          id: uuidv4(),
          income_id: incomeId,
          label: line.label,
          income_type_id: line.incomeType.id, // TODO not validated!
          value: line.value,
          payer: line.payer,
        })),
      },
      {
        include: [TaxReturnIncomeLineModel],
        transaction: t,
      },
    )
    await income.save({ transaction: t })
  }

  /**
   * Save property lines to the database via a transaction
   * @param taxReturnId ID of the tax return
   * @param lines Property lines to save
   * @param t Transaction to use
   */
  async saveProperty(
    taxReturnId: string,
    lines: TaxReturnPropertyLine[],
    t: Transaction,
  ) {
    // TODO check if the submitted property is already in the database
    const propertyId = uuidv4()
    const property = await this.taxReturnPropertyModel.create(
      {
        property_id: propertyId,
        tax_return_id: taxReturnId,
        type: 'submit',
        propertyLines: lines.map((line) => ({
          id: uuidv4(),
          property_id: propertyId,
          label: line.label,
          identifier: line.identifier,
          value: line.value,
          property_type_id: line.propertyType.id, // TODO not validated!
        })),
      },
      {
        include: [TaxReturnPropertyLineModel],
        transaction: t,
      },
    )
    await property.save({ transaction: t })
  }

  async saveDebt(
    taxReturnId: string,
    lines: TaxReturnDebtLine[],
    t: Transaction,
  ) {
    // TODO check if the submitted debt is already in the database
    const debtId = uuidv4()
    const debt = await this.taxReturnDebtModel.create(
      {
        id: debtId,
        tax_return_id: taxReturnId,
        type: 'submit',
        debtLines: lines.map((line) => {
          const originationDate = line.originationDate
            ? new Date(line.originationDate)
            : null
          console.log(
            'originationDate :>> ',
            originationDate,
            debtId,
            line.debtType.id,
          )
          return {
            id: uuidv4(),
            debt_id: debtId,
            debt_type_id: line.debtType.id, // TODO not validated!
            label: line.label,
            identifier: line.identifier,
            outstandingPrincipal: line.outstandingPrincipal,
            originationDate,
            term: line.term,
            interestAmount: line.interestAmount,
            annualTotalPayment: line.annualTotalPayment,
            annualTotalPrincipalPayment: line.annualTotalPrincipalPayment,
            creditorId: line.creditorId,
            currency: line.currency,
          }
        }),
      },
      {
        include: [TaxReturnDebtLineModel],
        transaction: t,
      },
    )
    await debt.save({ transaction: t })
  }

  async createTaxReturn(
    nationalId: string,
    year: string,
    body: SubmitTaxReturnBody,
  ): Promise<TaxReturnModel> {
    const taxReturn = await this.getTaxReturn(nationalId, year)

    if (!taxReturn) {
      throw new BadRequestException(`tax return does not exists`)
    }

    const t = await this.taxReturnModel.sequelize?.transaction()

    if (!t) {
      this.logger.error('error creating transaction')
      throw new InternalServerErrorException('unexpected error')
    }

    try {
      await this.saveIncome(taxReturn.id, body.incomeLines, t)
      await this.saveProperty(taxReturn.id, body.propertyLines, t)
      await this.saveDebt(taxReturn.id, body.debtLines, t)
      taxReturn.type = 'submit'
      taxReturn.submittedAt = new Date()
      await t.commit()
    } catch (e) {
      this.logger.error('error creating tax return', { error: e })
      await t.rollback()
      throw new InternalServerErrorException('unexpected error')
    }

    return taxReturn
  }

  async getTaxReturnTypes(): Promise<TaxReturnTypes> {
    const propertyTypes = await this.taxReturnPropertyTypeModel.findAll()
    const debtTypes = await this.taxReturnDebtTypeModel.findAll()
    const incomeTypes = await this.taxReturnIncomeTypeModel.findAll()
    const dto = new TaxReturnTypes(propertyTypes, debtTypes, incomeTypes)

    return dto
  }
}
