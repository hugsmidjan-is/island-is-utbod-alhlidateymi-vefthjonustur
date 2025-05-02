import { Injectable } from '@nestjs/common'
import { DrugApi } from '@island.is/clients/icelandic-health-insurance/rights-portal'
import { Auth, AuthMiddleware, User } from '@island.is/auth-nest-tools'
import { handle404 } from '@island.is/clients/middlewares'
import { DrugBillInput } from './dto/drugBill.input'
import { DrugBillLineInput } from './dto/drugBillLine.input'
import { DrugInput } from './dto/drug.input'
import { DrugCalculatorInput } from './dto/drugCalculator.input'
import { PaginatedDrugResponse } from './models/drug.model'
import { DrugCertificateInput } from './dto/drugCertificate.input'

@Injectable()
export class DrugService {
  constructor(private api: DrugApi) {}

  async getPeriods(user: User) {
    return await this.api
      .withMiddleware(new AuthMiddleware(user as Auth))
      .getDrugPaymentPeriods()
      .catch(handle404)
  }

  async getBills(user: User, input: DrugBillInput) {
    return await this.api
      .withMiddleware(new AuthMiddleware(user as Auth))
      .getDrugBills(input)
      .catch(handle404)
  }

  async getBillLines(user: User, input: DrugBillLineInput) {
    return await this.api
      .withMiddleware(new AuthMiddleware(user as Auth))
      .getDrugBillLineItems(input)
      .catch(handle404)
  }

  async getDrugs(user: User, input: DrugInput) {
    const data = await this.api
      .withMiddleware(new AuthMiddleware(user as Auth))
      .getDrugs(input)
      .catch(handle404)

    if (!data) return null

    const response = {
      data: data.drugs,
      pageInfo: data.pageInfo,
      totalCount: data.totalCount,
    } as PaginatedDrugResponse

    return response
  }

  async getCalculations(user: User, input: DrugCalculatorInput) {
    return await this.api
      .withMiddleware(new AuthMiddleware(user as Auth))
      .drugCalculator({
        minarsidurAPIModelsDrugsDrugCalculatorRequestDTO:
          input.drugCalculatorRequestDTO,
      })
      .catch(handle404)
  }

  async getCertificates(user: User) {
    return await this.api
      .withMiddleware(new AuthMiddleware(user as Auth))
      .getDrugCertificates()
      .catch(handle404)
  }

  async getCertificateById(user: User, input: DrugCertificateInput) {
    const certificates = await this.api
      .withMiddleware(new AuthMiddleware(user as Auth))
      .getDrugCertificates()
      .catch(handle404)

    if (!certificates) return null

    return certificates.find((certificate) => certificate.id === input.id)
  }
}
