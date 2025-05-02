import { buildSection } from '@island.is/application/core'
import { information } from '../../../lib/messages'
import { pickVehicleSubSection } from './pickVehicleSubSection'
import { ownerSubSection } from './ownerSubSection'
import { coOwnerSubSection } from './coOwnerSubSection'
import { vehicleSubSection } from './vehicleSubSection'

export const informationSection = buildSection({
  id: 'information',
  title: information.general.sectionTitle,
  children: [
    pickVehicleSubSection,
    vehicleSubSection,
    ownerSubSection,
    coOwnerSubSection,
  ],
})
