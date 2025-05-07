import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ITaxReturnAdminService } from './tax-return-admin.types'
import { InjectModel } from '@nestjs/sequelize'
import { TaxReturnModel } from '../tax-return/models/tax-return.tax-return.model'
import { LOGGER_PROVIDER } from '@hxm/logging'
import { Logger } from 'winston'
import { v4 as uuid } from 'uuid'

import { PageInfo, paginate, PaginationDto } from '@island.is/nest/pagination'
import { PagedTaxReturnResponse } from '../tax-return/dto/tax-return.paged.dto'

export class TaxReturnAdminService implements ITaxReturnAdminService {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
    @InjectModel(TaxReturnModel)
    private taxReturnModel: typeof TaxReturnModel,
  ) {}

  async getTaxReturns(query: PaginationDto): Promise<PagedTaxReturnResponse> {
    this.logger.info('TaxReturnAdminService.getTaxReturns')
    let result

    try {
      result = await paginate<TaxReturnModel>({
        Model: this.taxReturnModel,
        limit: query.limit || 10,
        after: query.after || '',
        before: query.before,
        primaryKeyField: 'id',
        orderOption: [['year', 'DESC']],
      })
    } catch (e) {
      this.logger.error('error fetching tax returns from database', {
        error: e,
      })
      throw new InternalServerErrorException('unexpected error')
    }

    if (!result) {
      throw new NotFoundException(`tax returns not found`)
    }

    return result
  }

  async createTaxReturn(nationalId: string): Promise<TaxReturnModel> {
    let result
    try {
      result = await this.taxReturnModel.create({
        id: uuid(),
        year: 2024,
        nationalId,
        name: 'Jökull Þórðarson',
      })
    } catch (e) {
      this.logger.error('error creating tax return', {
        error: e,
      })
      throw new InternalServerErrorException('unexpected error')
    }

    if (!result) {
      throw new NotFoundException(`tax returns not created`)
    }

    return result
  }

  async getTaxReturn(id: string): Promise<TaxReturnModel> {
    let result: TaxReturnModel | null = null
    try {
      result = await this.taxReturnModel.findOne({ where: { id } })
    } catch (e) {
      this.logger.error('error getting tax return', {
        error: e,
      })
      throw new InternalServerErrorException('unexpected error')
    }

    if (!result) {
      throw new NotFoundException(`tax return not found`)
    }

    return result
  }

  async updateTaxReturn(id: String): Promise<boolean> {
    let result
    try {
      result = await this.taxReturnModel.update({}, { where: { id } })
    } catch (e) {
      this.logger.error('error updating tax return', {
        error: e,
      })
      throw new InternalServerErrorException('unexpected error')
    }

    if (!result) {
      throw new NotFoundException(`tax return not updated`)
    }

    const [affactedCount] = result

    return affactedCount > 0
  }

  async deleteTaxReturn(id: string): Promise<boolean> {
    let result = 0
    try {
      result = await this.taxReturnModel.destroy({ where: { id } })
    } catch (e) {
      this.logger.error('error deleteing tax return', {
        error: e,
      })
      throw new InternalServerErrorException('unexpected error')
    }

    if (!result) {
      throw new NotFoundException(`tax return not deleted`)
    }

    return result > 0
  }
}
