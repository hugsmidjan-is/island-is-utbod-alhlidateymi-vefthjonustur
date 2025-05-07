import { PaginationDto } from '@island.is/nest/pagination'
import { TaxReturnModel } from '../tax-return/models/tax-return.tax-return.model'
import { PagedTaxReturnResponse } from '../tax-return/dto/tax-return.paged.dto'

export interface ITaxReturnAdminService {
  getTaxReturns(query: PaginationDto): Promise<PagedTaxReturnResponse>
  createTaxReturn(nationalId: string): Promise<TaxReturnModel>
  getTaxReturn(id: string): Promise<TaxReturnModel>
  updateTaxReturn(id: string): Promise<boolean>
  deleteTaxReturn(id: string): Promise<boolean>
}

export const ITaxReturnAdminService = Symbol('ITaxReturnAdminService')
