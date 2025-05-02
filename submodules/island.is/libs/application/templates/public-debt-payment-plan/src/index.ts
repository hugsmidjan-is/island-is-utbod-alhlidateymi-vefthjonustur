import PublicDebtPaymentPlanTemplate from './lib/PublicDebtPaymentPlanTemplate'

export const getDataProviders = () => import('./dataProviders/')
export const getFields = () => import('./fields/')
export * from './lib/messages/errorModal'
export default PublicDebtPaymentPlanTemplate
