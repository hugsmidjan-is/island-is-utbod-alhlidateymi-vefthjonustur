import { Application } from '@island.is/api/schema'
import {
  buildMultiField,
  buildTextField,
  buildSubSection,
  buildDescriptionField,
} from '@island.is/application/core'
import format from 'date-fns/format'

import { information } from '../../../lib/messages/information'
import { VehiclesCurrentVehicle } from '../../../shared/types'
import { getSelectedVehicle } from '../../../utils'

export const userInformationSubSection = buildSubSection({
  id: 'vehicleDetails',
  title: information.labels.vehicle.sectionTitle,
  children: [
    buildMultiField({
      id: 'vehicleDetailsMultiField',
      title: information.labels.vehicle.pageTitle,
      description: information.labels.vehicle.description,
      children: [
        buildDescriptionField({
          id: 'vehicleDetails.title',
          title: information.labels.vehicle.title,
          titleVariant: 'h5',
        }),
        buildTextField({
          id: 'selectVehicle.plate',
          title: information.labels.vehicle.plate,
          backgroundColor: 'white',
          width: 'half',
          readOnly: true,
          defaultValue: (application: Application) => {
            const vehicle = getSelectedVehicle(
              application.externalData,
              application.answers,
            ) as VehiclesCurrentVehicle
            return vehicle?.permno
          },
        }),
        buildTextField({
          id: 'selectVehicle.type',
          title: information.labels.vehicle.type,
          backgroundColor: 'white',
          width: 'half',
          readOnly: true,
          defaultValue: (application: Application) => {
            const vehicle = getSelectedVehicle(
              application.externalData,
              application.answers,
            ) as VehiclesCurrentVehicle
            return vehicle?.make
          },
        }),
        buildTextField({
          id: 'vehicleDetails.price',
          title: information.labels.vehicle.price,
          backgroundColor: 'blue',
          width: 'half',
          variant: 'currency',
          required: true,
        }),
        buildTextField({
          id: 'selectVehicle.newRegistrationDate',
          title: information.labels.vehicle.registrationDate,
          width: 'half',
          readOnly: true,
          defaultValue: (application: Application) => {
            const vehicle = getSelectedVehicle(
              application.externalData,
              application.answers,
            ) as VehiclesCurrentVehicle
            return (
              vehicle.newRegistrationDate &&
              format(new Date(vehicle.newRegistrationDate), 'dd.MM.yyyy')
            )
          },
        }),
        buildDescriptionField({
          id: 'applicant.description',
          title: information.labels.applicant.description,
          titleVariant: 'h5',
          space: 'gutter',
        }),
        buildTextField({
          id: 'applicant.name',
          title: information.labels.applicant.name,
          backgroundColor: 'white',
          width: 'half',
          readOnly: true,
          defaultValue: (application: Application) =>
            application.externalData?.identity?.data?.name,
        }),
        buildTextField({
          id: 'applicant.nationalId',
          title: information.labels.applicant.nationalId,
          backgroundColor: 'white',
          width: 'half',
          readOnly: true,
          format: '######-####',
          defaultValue: (application: Application) =>
            application.externalData?.identity?.data?.nationalId,
        }),
      ],
    }),
  ],
})
