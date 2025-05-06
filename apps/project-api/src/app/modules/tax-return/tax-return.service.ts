import { LOGGER_PROVIDER } from '@hxm/logging'
import {
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
}
