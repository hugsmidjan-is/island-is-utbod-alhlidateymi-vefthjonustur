import { createStore } from '@island.is/shared/mocking'

import * as data from './static'
import {
  RightsPortalCopaymentBillResponse,
  RightsPortalCopaymentPeriodResponse,
  RightsPortalPaymentOverviewDocumentResponse,
  RightsPortalPaymentOverviewResponse,
  RightsPortalCopaymentStatus,
  RightsPortalPaymentOverviewServiceTypeResponse,
} from '../../types'

export const store = createStore(() => {
  const getPaymentOverviewServiceTypes: RightsPortalPaymentOverviewServiceTypeResponse =
    data.getPaymentOverviewServiceTypes
  const getPaymentOverview: RightsPortalPaymentOverviewResponse =
    data.getPaymentOverview
  const getPaymentOverviewDocument: RightsPortalPaymentOverviewDocumentResponse =
    data.getPaymentOverviewDocument
  const getCopaymentStatus: RightsPortalCopaymentStatus =
    data.getCopaymentStatus
  const getCopaymentPeriods: RightsPortalCopaymentPeriodResponse =
    data.getCopaymentPeriods
  const getCopaymentBills: RightsPortalCopaymentBillResponse =
    data.getCopaymentBills

  return {
    getPaymentOverviewServiceTypes,
    getPaymentOverview,
    getPaymentOverviewDocument,
    getCopaymentStatus,
    getCopaymentPeriods,
    getCopaymentBills,
  }
})
