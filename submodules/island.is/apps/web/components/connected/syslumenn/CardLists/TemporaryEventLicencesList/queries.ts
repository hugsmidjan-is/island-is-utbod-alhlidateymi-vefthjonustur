import gql from 'graphql-tag'

export const GET_TEMPORARY_EVENT_LICENCES = gql`
  query GetTemporaryEventLicences {
    getTemporaryEventLicences {
      licenceType
      licenceSubType
      licenseNumber
      issuedBy
      validFrom
      validTo
      licenseHolder
      licenseResponsible
      maximumNumberOfGuests
      estimatedNumberOfGuests
      location
    }
  }
`
