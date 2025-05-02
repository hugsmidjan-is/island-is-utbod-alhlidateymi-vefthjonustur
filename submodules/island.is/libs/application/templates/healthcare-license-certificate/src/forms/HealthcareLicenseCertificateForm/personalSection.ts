import {
  buildDescriptionField,
  buildMultiField,
  buildPhoneField,
  buildSection,
  buildTextField,
} from '@island.is/application/core'
import { personal } from '../../lib/messages'
import { Application } from '@island.is/api/schema'
import { formatDate } from '../../utils'

export const PersonalSection = buildSection({
  id: 'personal',
  title: personal.general.sectionTitle,
  children: [
    buildMultiField({
      id: 'userInformation',
      title: personal.labels.userInformation.pageTitle,
      children: [
        buildDescriptionField({
          id: 'userInformation.title',
          title: personal.labels.userInformation.title,
          titleVariant: 'h5',
        }),
        buildTextField({
          id: 'userInformation.nationalId',
          title: personal.labels.userInformation.nationalId,
          backgroundColor: 'white',
          width: 'half',
          readOnly: true,
          format: '######-####',
          defaultValue: (application: Application) =>
            application.externalData?.nationalRegistry?.data?.nationalId,
        }),
        buildTextField({
          id: 'userInformation.name',
          title: personal.labels.userInformation.name,
          backgroundColor: 'white',
          width: 'half',
          readOnly: true,
          defaultValue: (application: Application) =>
            application.externalData?.nationalRegistry?.data?.fullName,
        }),
        buildTextField({
          id: 'userInformation.birthDate',
          title: personal.labels.userInformation.birthDate,
          backgroundColor: 'white',
          width: 'half',
          readOnly: true,
          defaultValue: (application: Application) =>
            formatDate(
              application.externalData?.nationalRegistry?.data?.birthDate,
            ),
        }),
        buildTextField({
          id: 'userInformation.email',
          title: personal.labels.userInformation.email,
          width: 'half',
          variant: 'email',
          required: true,
          defaultValue: (application: Application) =>
            application.externalData?.userProfile?.data?.email,
        }),
        buildPhoneField({
          id: 'userInformation.phone',
          title: personal.labels.userInformation.phone,
          width: 'half',
          backgroundColor: 'blue',
          required: true,
          defaultValue: (application: Application) =>
            application.externalData?.userProfile?.data?.mobilePhoneNumber,
        }),
      ],
    }),
  ],
})
