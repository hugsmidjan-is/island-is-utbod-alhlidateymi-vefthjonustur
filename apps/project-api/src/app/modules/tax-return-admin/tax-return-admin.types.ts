import { PaginationDto } from '@island.is/nest/pagination'
import { TaxReturnModel } from '../tax-return/models/tax-return.tax-return.model'
import { PagedTaxReturnResponse } from '../tax-return/dto/tax-return.paged.dto'
import { SubmitTaxReturnBody } from '../tax-return/dto/tax-return.submit-body.dto'

export interface ITaxReturnAdminService {
  getTaxReturns(query: PaginationDto): Promise<PagedTaxReturnResponse>
  createTaxReturn(
    nationalId: string,
    body: SubmitTaxReturnBody,
  ): Promise<TaxReturnModel>
  getTaxReturn(id: string): Promise<TaxReturnModel>
  updateTaxReturn(id: string, body: SubmitTaxReturnBody): Promise<boolean>
  deleteTaxReturn(id: string): Promise<boolean>
}

export const ITaxReturnAdminService = Symbol('ITaxReturnAdminService')
