import { defineMessages } from 'react-intl'

export const information = {
  general: defineMessages({
    sectionTitle: {
      id: 'ta.ccov.application:information.general.sectionTitle',
      defaultMessage: 'Upplýsingar',
      description: 'Title of information section',
    },
    pageTitle: {
      id: 'ta.ccov.application:information.general.pageTitle',
      defaultMessage: 'Upplýsingar',
      description: 'Title of information page',
    },
  }),
  labels: {
    pickVehicle: defineMessages({
      sectionTitle: {
        id: 'ta.ccov.application:information.labels.pickVehicle.sectionTitle',
        defaultMessage: 'Veldu ökutæki',
        description: 'Pick vehicle section title',
      },
      title: {
        id: 'ta.ccov.application:information.labels.pickVehicle.title',
        defaultMessage: 'Veldu ökutæki',
        description: 'Pick vehicle title',
      },
      description: {
        id: 'ta.ccov.application:information.labels.pickVehicle.description',
        defaultMessage:
          'Hér að neðan er listi yfir ökutæki í þinni eigu. Veldu það ökutæki sem þú ætlar að bæta við/fella niður meðeiganda á.',
        description: 'Pick vehicle description',
      },
      vehicle: {
        id: 'ta.ccov.application:information.labels.pickVehicle.vehicle',
        defaultMessage: 'Ökutæki',
        description: 'Pick vehicle label',
      },
      placeholder: {
        id: 'ta.ccov.application:information.labels.pickVehicle.placeholder',
        defaultMessage: 'Veldu ökutæki',
        description: 'Pick vehicle placeholder',
      },
      findPlatePlaceholder: {
        id: 'ta.ccov.application:information.labels.pickVehicle.findPlatePlaceholder',
        defaultMessage: 'Sláðu inn plötunúmer',
        description: 'Pick vehicle find plate placeholder',
      },
      findButton: {
        id: 'ta.ccov.application:information.labels.pickVehicle.findButton',
        defaultMessage: 'Leita',
        description: 'Pick vehicle find button',
      },
      notFoundTitle: {
        id: 'ta.ccov.application:information.labels.pickVehicle.notFoundTitle',
        defaultMessage: 'Eitthvað fór úrskeiðis',
        description: 'vehicle not found',
      },
      notFoundMessage: {
        id: 'ta.ccov.application:information.labels.pickVehicle.notFoundMessage',
        defaultMessage: 'Ökutæki með plötunúmerið {plate} fannst ekki',
        description: 'vehicle not found',
      },
      hasErrorTitle: {
        id: 'ta.ccov.application:information.labels.pickVehicle.hasErrorTitle',
        defaultMessage: 'Ekki er hægt að selja þessa bifreið vegna:',
        description: 'Pick vehicle has an error title',
      },
      isNotDebtLessTag: {
        id: 'ta.ccov.application:information.labels.pickVehicle.isNotDebtLessTag',
        defaultMessage: 'Ógreidd bifreiðagjöld',
        description: 'Pick vehicle is not debt less tag',
      },
    }),
    owner: defineMessages({
      sectionTitle: {
        id: 'ta.ccov.application:information.labels.owner.sectionTitle',
        defaultMessage: 'Eigandi',
        description: 'Owner section title',
      },
      title: {
        id: 'ta.ccov.application:information.labels.owner.title',
        defaultMessage: 'Eigandi',
        description: 'Owner title',
      },
      subtitle: {
        id: 'ta.ccov.application:information.labels.owner.subtitle',
        defaultMessage: 'Aðaleigandi',
        description: 'Main owner title',
      },
      description: {
        id: 'ta.ccov.application:information.labels.owner.description',
        defaultMessage: ' ',
        description: 'Owner description',
      },
      nationalId: {
        id: 'ta.ccov.application:information.labels.owner.nationalId',
        defaultMessage: 'Kennitala eiganda',
        description: 'Owner national ID label',
      },
      name: {
        id: 'ta.ccov.application:information.labels.owner.name',
        defaultMessage: 'Nafn eiganda',
        description: 'Owner name label',
      },
      email: {
        id: 'ta.ccov.application:information.labels.owner.email',
        defaultMessage: 'Netfang',
        description: 'Owner email label',
      },
      phone: {
        id: 'ta.ccov.application:information.labels.owner.phone',
        defaultMessage: 'Gsm númer',
        description: 'Owner phone number label',
      },
    }),
    coOwner: defineMessages({
      sectionTitle: {
        id: 'ta.ccov.application:information.labels.coOwner.sectionTitle',
        defaultMessage: 'Meðeigandi',
        description: 'Co-owner section title',
      },
      title: {
        id: 'ta.ccov.application:information.labels.coOwner.title',
        defaultMessage: 'Meðeigandi',
        description: 'Co-owner title',
      },
      description: {
        id: 'ta.ccov.application:information.labels.coOwner.description',
        defaultMessage: ' ',
        description: 'coOwner description',
      },
      nationalId: {
        id: 'ta.ccov.application:information.labels.coOwner.nationalId',
        defaultMessage: 'Kennitala meðeiganda',
        description: 'Co-owner national ID label',
      },
      name: {
        id: 'ta.ccov.application:information.labels.coOwner.name',
        defaultMessage: 'Nafn meðeiganda',
        description: 'Co-owner name label',
      },
      email: {
        id: 'ta.ccov.application:information.labels.coOwner.email',
        defaultMessage: 'Netfang',
        description: 'Co-owner email label',
      },
      phone: {
        id: 'ta.ccov.application:information.labels.coOwner.phone',
        defaultMessage: 'Gsm númer',
        description: 'Co-owner phone number label',
      },
      error: {
        id: 'ta.ccov.application:information.labels.coOwner.error',
        defaultMessage: 'Það kom upp villa við að sækja upplýsingar um bifreið',
        description: 'Co-owner error message',
      },
      coOwnerTempTitle: {
        id: 'ta.ccov.application:information.labels.coOwner.coOwnerTempTitle',
        defaultMessage: 'Nýr meðeigandi',
        description: 'Coowner temp title',
      },
      add: {
        id: 'ta.ccov.application:information.labels.coOwner.add',
        defaultMessage: 'Bæta við meðeiganda',
        description: 'coOwner add label',
      },
      remove: {
        id: 'ta.ccov.application:information.labels.coOwner.remove',
        defaultMessage: 'Fjarlægja meðeiganda',
        description: 'Co-owner remove label',
      },
      identicalError: {
        id: 'ta.ccov.application:information.labels.coOwner.identicalError',
        defaultMessage: 'Það má ekki nota sömu kennitölu tvisvar',
        description: 'coOwner identical error',
      },
      noChangesError: {
        id: 'ta.ccov.application:information.labels.coOwner.noChangesError',
        defaultMessage: 'Ekki er búið að gera neinar breytingar á meðeigendum',
        description: 'coOwner no changes error',
      },
    }),
    vehicle: defineMessages({
      sectionTitle: {
        id: 'ta.ccov.application:information.labels.vehicle.sectionTitle',
        defaultMessage: 'Ökutæki',
        description: 'Vehicle section title',
      },
      title: {
        id: 'ta.ccov.application:information.labels.vehicle.title',
        defaultMessage: 'Ökutæki',
        description: 'Vehicle title',
      },
      description: {
        id: 'ta.ccov.application:information.labels.vehicle.description',
        defaultMessage:
          'Et sed ut est aliquam proin elit sed. Nunc tellus lacus sed eu pulvinar.',
        description: 'Vehicle description',
      },
      plate: {
        id: 'ta.ccov.application:information.labels.vehicle.plate',
        defaultMessage: 'Númer ökutækis',
        description: 'Vehicle plate number label',
      },
      type: {
        id: 'ta.ccov.application:information.labels.vehicle.type',
        defaultMessage: 'Tegund ökutækis',
        description: 'Vehicle type label',
      },
      mileage: {
        id: 'ta.ccov.application:information.labels.vehicle.mileage',
        defaultMessage: 'Kílómetrar',
        description: 'Mileage for vehicle label',
      },
    }),
  },
}
