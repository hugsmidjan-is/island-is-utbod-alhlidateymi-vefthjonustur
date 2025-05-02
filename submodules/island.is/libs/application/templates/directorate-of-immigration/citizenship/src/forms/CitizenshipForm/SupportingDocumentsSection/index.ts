import { buildSection, getValueViaPath } from '@island.is/application/core'
import {
  Application,
  NationalRegistryIndividual,
} from '@island.is/application/types'
import { supportingDocuments } from '../../../lib/messages'
import { OtherDocumentsSubSection } from './OtherDocumentsSubSection'
import { PassportSubSection } from './PassportSubSection'
import { Routes } from '../../../lib/constants'

export const SupportingDocumentsSection = buildSection({
  id: Routes.SUPPORTINGDOCUMENTS,
  title: (application: Application) => {
    const applicant = getValueViaPath(
      application.externalData,
      'individual.data',
      '',
    ) as NationalRegistryIndividual | undefined

    return {
      ...supportingDocuments.general.sectionTitleWithPerson,
      values: {
        person: `${applicant?.givenName} ${applicant?.familyName}`,
      },
    }
  },
  children: [PassportSubSection, OtherDocumentsSubSection],
})
