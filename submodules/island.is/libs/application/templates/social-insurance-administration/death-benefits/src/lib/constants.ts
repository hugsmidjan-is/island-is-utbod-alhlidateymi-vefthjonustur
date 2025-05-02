import { socialInsuranceAdministrationMessage } from '@island.is/application/templates/social-insurance-administration-core/lib/messages'
import { MessageDescriptor } from 'react-intl'
import { deathBenefitsFormMessage } from './messages'

export const AttachmentLabel: {
  [key: string]: MessageDescriptor
} = {
  additionalDocuments:
    socialInsuranceAdministrationMessage.confirm.additionalDocumentsAttachment,
  expectingChild: deathBenefitsFormMessage.confirm.expectingChildAttachment,
  deathCertificate: deathBenefitsFormMessage.confirm.deathCertificateAttachment,
}
