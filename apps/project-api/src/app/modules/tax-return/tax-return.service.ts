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
import { TaxReturnIncomeModel } from './models/tax-return.income.model'
import { TaxReturnIncomeLineModel } from './models/tax-return.income-line.model'
import { TaxReturnIncomeTypeModel } from './models/tax-return.income-type.model'

export class TaxReturnService implements ITaxReturnService {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
    @InjectModel(TaxReturnModel)
    private taxReturnModel: typeof TaxReturnModel,
    @InjectModel(TaxReturnIncomeModel)
    private taxReturnIncomeModel: typeof TaxReturnIncomeModel,
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
}
