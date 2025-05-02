import { defineMessages } from 'react-intl'

export const olMessage = defineMessages({
  occupationalLicense: {
    id: 'sp.occupational-licenses:occupational-license',
    defaultMessage: 'Starfsleyfi',
  },
  myLicenses: {
    id: 'sp.occupational-licenses:my-licenses',
    defaultMessage: 'Mín starfsleyfi',
  },
  singleEducationLicense: {
    id: 'sp.occupational-licenses:single-education-license',
    defaultMessage: 'Stakt leyfisbréf kennara',
  },
  singleHealthLicense: {
    id: 'sp.occupational-licenses:single-health-license',
    defaultMessage: 'Stakt starfsleyfi heilbrigðisstarfsmanns',
  },
  singleLicense: {
    id: 'sp.occupational-licenses:single-license',
    defaultMessage: 'Stakt starfsleyfi',
  },
  educationIntro: {
    id: 'sp.occupational-licenses:education-intro',
    defaultMessage:
      'Hér birtast leyfisbréf kennara sem hafa verið útskrifaðir frá 1988. Bréfin eru sótt til Menntamálastofnunar.',
  },
  theDirectorateOfEducation: {
    id: 'sp.occupational-licenses:the-directorate-of-education',
    defaultMessage: 'Menntamálastofnun',
  },
  theDirectorateOfHealth: {
    id: 'sp.occupational-licenses:the-directorate-of-health',
    defaultMessage: 'Embætti landlæknis',
  },
  healthDirectorateIntro: {
    id: 'sp.occupational-licenses:health-directorate-intro',
    defaultMessage: 'Starfsleyfi útgefið af Landlæknisembættinu.',
  },
  healthDirectorateTooltip: {
    id: 'sp.occupational-licenses:health-directorate-tooltip',
    defaultMessage:
      'Embætti landlæknis hefur umsjón með gögnum um starfsleyfi heilbrigðisstarfsfólks.',
  },
  validLicense: {
    id: 'sp.occupational-licenses:valid-license',
    defaultMessage: 'Í gildi',
  },
  invalidLicense: {
    id: 'sp.occupational-licenses:invalid-license',
    defaultMessage: 'Útrunnið',
  },
  unknownLicense: {
    id: 'sp.occupational-licenses:unknown-license',
    defaultMessage: 'Óþekkt',
  },
  inProgressLicense: {
    id: 'sp.occupational-licenses:in-progress-license',
    defaultMessage: 'Í vinnslu',
  },
  validWithLimitationsLicense: {
    id: 'sp.occupational-licenses:valid-with-limitations-license',
    defaultMessage: 'Í gildi með takmörkunum',
  },
  revokedLicense: {
    id: 'sp.occupational-licenses:revoked-license',
    defaultMessage: 'Svipting',
  },
  waivedLicense: {
    id: 'sp.occupational-licenses:waived-license',
    defaultMessage: 'Afsal',
  },
  dayOfPublication: {
    id: 'sp.occupational-licenses:day-of-publication',
    defaultMessage: 'Útgáfudagur',
  },
  errorFetchLicense: {
    id: 'sp.occupational-licenses:error-fetch-license',
    defaultMessage: 'Ekki tókst að sækja leyfisbréf',
  },
  fetchLicense: {
    id: 'sp.occupational-licenses:fetch-license',
    defaultMessage: 'Sækja leyfisbréf',
  },
  nameOfIndividual: {
    id: 'sp.occupational-licenses:name-of-individual',
    defaultMessage: 'Nafn einstaklings',
  },
  licenseNumber: {
    id: 'sp.occupational-licenses:license-number',
    defaultMessage: 'Skírteinisnúmer',
  },
  dateOfBirth: {
    id: 'sp.occupational-licenses:date-of-birth',
    defaultMessage: 'Fæðingardagur',
  },
  profession: {
    id: 'sp.occupational-licenses:profession',
    defaultMessage: 'Starfstétt',
  },
  typeofLicense: {
    id: 'sp.occupational-licenses:type-of-license',
    defaultMessage: 'Tegund leyfis',
  },
  publisher: {
    id: 'sp.occupational-licenses:publisher',
    defaultMessage: 'Útgefið af',
  },
  dateOfIssue: {
    id: 'sp.occupational-licenses:date-of-issue',
    defaultMessage: 'Útgáfudagur',
  },
  licenseStatus: {
    id: 'sp.occupational-licenses:license-status',
    defaultMessage: 'Staða',
  },

  fetchOverviewError: {
    id: 'sp.occupational-licenses:fetch-overview-error',
    defaultMessage: 'Ekki tókst að sækja öll gögn',
  },
  fetchOverviewErrorDetail: {
    id: 'sp.occupational-licenses:fetch-overview-error-detail',
    defaultMessage:
      'Einhverjar tengingar virðast hafa rofnað svo ekki tókst að sækja gögn frá eftirfarandi aðilum: {arg}. Verið er að vinna í að lagfæra tenginguna.',
  },
  fetchServerErrorTitle: {
    id: 'sp.occupational-licenses:fetch-server-error-title',
    defaultMessage: 'Villa kom upp í samskiptum við {institution}',
  },
  fetchServerErrorMessage: {
    id: 'sp.occupational-licenses:fetch-server-error-message',
    defaultMessage:
      'Ekki tókst að sækja gögn frá {institution}, vinsamlegast reyndu aftur síðar.',
  },
  fetchNoDataTitle: {
    id: 'sp.occupational-licenses:fetch-no-data-title',
    defaultMessage: 'Engin gögn fundust hjá {institution}',
  },
  fetchNoDataMessage: {
    id: 'sp.occupational-licenses:fetch-no-data-message',
    defaultMessage:
      'Engin gögn fundust hjá {institution}, vinsamlegast reyndu aftur síðar.',
  },
  noLicenses: {
    id: 'sp.occupational-licenses:no-licenses',
    defaultMessage: 'Engin starfsleyfi fundust',
  },
  education: {
    id: 'sp.occupational-licenses:education-issuer',
    defaultMessage: 'Menntamálastofnun',
  },
  districtCommissioners: {
    id: 'sp.occupational-licenses:district-commissioners-issuer',
    defaultMessage: 'Sýslumenn',
  },
  health: {
    id: 'sp.occupational-licenses:health-issuer',
    defaultMessage: 'Landlæknir',
  },
  educationLicenseDigitalUnavailable: {
    id: 'sp.occupational-licenses:education-license-digital-unavailable',
    defaultMessage: 'Leyfisbréf óaðgengilegt',
  },
  educationLicenseDigitalUnavailableDescription: {
    id: 'sp.occupational-licenses:education-license-digital-unavailable-description',
    defaultMessage:
      'Leyfisbréf gefin út fyrir 1. janúar 2020 eru ekki aðgengileg á island.is. Þurfir þú afrit af áður útgefnu leyfisbréfi getur þú sent póst til mennta- og barnamálaráðuneytisins á netfangið mrn@mrn.is. Afrit leyfisbréfa eru send í tölvupósti sem pdf. skjöl.',
  },
})
