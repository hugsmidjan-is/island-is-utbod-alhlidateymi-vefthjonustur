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
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@hxm/constants'

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

  // async createTaxReturn() {}
  // async getTaxReturn() {}
  // async updateTaxReturn() {}
  // async deleteTaxReturn() {}
}
