import { ApiProperty } from '@nestjs/swagger'
import { Paging } from '../../paging/dto/paging.dto'
import { TaxReturnModel } from '../models/tax-return.tax-return.model'

export class PagedTaxReturnResponse extends Paging<TaxReturnModel> {
  @ApiProperty({ type: [TaxReturnModel] })
  data!: TaxReturnModel[]
}
