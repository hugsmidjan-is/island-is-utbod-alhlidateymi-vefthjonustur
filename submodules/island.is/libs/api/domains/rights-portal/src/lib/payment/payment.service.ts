import { Injectable } from '@nestjs/common'
import { Auth, AuthMiddleware, User } from '@island.is/auth-nest-tools'
import {
  PaymentsOverviewApi,
  PaymentsCopaymentApi,
} from '@island.is/clients/icelandic-health-insurance/rights-portal'
import { CopaymentStatus } from './models/copaymentStatus.model'
import { CopaymentPeriod } from './models/copaymentPeriod.model'
import { CopaymentBill } from './models/copaymentBill.model'
import { PaymentError, PaymentErrorStatus } from './models/paymentError.model'

import { PaymentOverviewDocumentInput } from './dto/paymentOverviewDocument.input'
import { PaymentOverviewDocument } from './models/paymentOverviewDocument.model'
import { CopaymentBillsInput } from './dto/copaymentBills.input'

import { handle404 } from '@island.is/clients/middlewares'
import { PaymentOverviewServiceType } from './models/paymentOverviewServiceType.model'
import { PaymentOverview } from './models/paymentOverview.model'
import { PaymentOverviewInput } from './dto/paymentOverview.input'
import { CopaymentPeriodInput } from './dto/copaymentPeriod.input'

export type PaymentResponse<T> = {
  items: T[]
  errors: PaymentError[]
}

@Injectable()
export class PaymentService {
  constructor(
    private readonly coPaymentApi: PaymentsCopaymentApi,
    private readonly overviewApi: PaymentsOverviewApi,
  ) {}

  async getCopaymentStatus(user: User): Promise<CopaymentStatus | null> {
    const data = await this.coPaymentApi
      .withMiddleware(new AuthMiddleware(user as Auth))
      .getCopaymentStatus()
      .catch(handle404)

    return {
      insuranceStatus: {
        display: data?.insuranceStatus?.display ?? undefined,
        code: data?.insuranceStatus?.code ?? undefined,
      },
      maximumMonthlyPayment: data?.maximumMonthlyPayment ?? undefined,
      maximumPayment: data?.maximumPayment ?? undefined,
      basePayment: data?.basePayment ?? undefined,
    }
  }

  async getCopaymentPeriods(
    user: User,
    input: CopaymentPeriodInput,
  ): Promise<PaymentResponse<CopaymentPeriod>> {
    try {
      const data = await this.coPaymentApi
        .withMiddleware(new AuthMiddleware(user as Auth))
        .getCopaymentPeriods(input)
        .catch(handle404)

      return {
        items: data ? data : [],
        errors: [],
      }
    } catch (error) {
      return {
        items: [],
        errors: [{ status: PaymentErrorStatus.INTERNAL_SERVICE_ERROR }],
      }
    }
  }

  async getCopaymentBills(
    user: User,
    input: CopaymentBillsInput,
  ): Promise<PaymentResponse<CopaymentBill>> {
    try {
      const data = await this.coPaymentApi
        .withMiddleware(new AuthMiddleware(user as Auth))
        .getCopaymentBills(input)
        .catch(handle404)

      return {
        items: data ? data.bills ?? [] : [],
        errors: [],
      }
    } catch (error) {
      return {
        items: [],
        errors: [{ status: PaymentErrorStatus.INTERNAL_SERVICE_ERROR }],
      }
    }
  }

  async getPaymentOverviewServiceTypes(
    user: User,
  ): Promise<PaymentResponse<PaymentOverviewServiceType>> {
    try {
      const data = await this.overviewApi
        .withMiddleware(new AuthMiddleware(user as Auth))
        .getPaymentsOverviewServiceTypes()
        .catch(handle404)

      return {
        items: data ? data : [],
        errors: [],
      }
    } catch (error) {
      return {
        items: [],
        errors: [{ status: PaymentErrorStatus.INTERNAL_SERVICE_ERROR }],
      }
    }
  }

  async getPaymentOverview(
    user: User,
    input: PaymentOverviewInput,
  ): Promise<PaymentResponse<PaymentOverview>> {
    try {
      const data = await this.overviewApi
        .withMiddleware(new AuthMiddleware(user as Auth))
        .getPaymentsOverview(input)
        .catch(handle404)

      return {
        items: data ? [data] : [],
        errors: [],
      }
    } catch (error) {
      return {
        items: [],
        errors: [{ status: PaymentErrorStatus.INTERNAL_SERVICE_ERROR }],
      }
    }
  }

  async getPaymentOverviewBillDocument(
    user: User,
    input: PaymentOverviewDocumentInput,
  ): Promise<PaymentResponse<PaymentOverviewDocument>> {
    try {
      const data = await this.overviewApi
        .withMiddleware(new AuthMiddleware(user as Auth))
        .getPaymentsOverviewDocument(input)
        .catch(handle404)

      if (!data)
        return {
          items: [],
          errors: [{ status: PaymentErrorStatus.NOT_FOUND }],
        }

      return {
        items: [data],
        errors: [],
      }
    } catch (error) {
      return {
        items: [],
        errors: [{ status: PaymentErrorStatus.INTERNAL_SERVICE_ERROR }],
      }
    }
  }
}
