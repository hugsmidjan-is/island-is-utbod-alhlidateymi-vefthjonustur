import { Locale } from '@island.is/shared/types'

const formRoutes = '/umsokn/'

export const Routes = {
  application: '/umsokn',
  form: {
    info: `${formRoutes}rettur`,
    relationship: `${formRoutes}hjuskaparstada`,
    homeCircumstances: `${formRoutes}buseta`,
    student: `${formRoutes}nam`,
    incomeFiles: `${formRoutes}gogn`,
    taxReturnFiles: `${formRoutes}skattagogn`,
    hasIncome: `${formRoutes}tekjur`,
    employment: `${formRoutes}atvinna`,
    usePersonalTaxCredit: `${formRoutes}personuafslattur`,
    bankInfo: `${formRoutes}bankaupplysingar`,
    contactInfo: `${formRoutes}samskipti`,
    summary: `${formRoutes}yfirlit`,
    spouseSummary: `${formRoutes}yfirlit-maki`,
    conformation: `${formRoutes}stadfesting`,
  },
  settings: {
    search: '/leit',
    settings: '/stillingar',
    municipality: '/sveitarfelagsstillingar',
    municipalities: '/sveitarfelog',
    supervisors: '/umsjonaradilar',
    users: `/notendur`,
  },
  status: '/stada',
  statusPage: (id: string) => `/stada/${id}`,
  statusFileUpload: (id: string) => `/stada/${id}/gogn`,
  statusFileUploadSuccess: (id: string) => `/stada/${id}/gogn/send`,
  statusFileUploadFailure: (id: string) => `/stada/${id}/gogn/villa`,
  filesPage: (hasIncome?: boolean) =>
    `${formRoutes}${hasIncome ? 'skattagogn' : 'gogn'}`,
  newCases: '/nymal',
  serviceCenter: (id: string) => `/midstod/${id}`,
  userProfile: (id: string) => `/notendur/${id}`,
  municipalityProfile: (id: string) => `/sveitarfelog/${id}`,
  applicationProfile: (id: string) => `/umsokn/${id}`,
  printApplicationProfile: (id: string) => `/umsokn/${id}/print`,
}

export const months = [
  'janúar',
  'febrúar',
  'mars',
  'apríl',
  'maí',
  'júní',
  'júlí',
  'ágúst',
  'september',
  'október',
  'nóvember',
  'desember',
]

export const monthsEnglish = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getMonth = (month: number, lang: Locale = 'is') => {
  if (lang === 'is') {
    return months[month]
  }
  return monthsEnglish[month]
}

export const nextMonth = (month?: number) => {
  return (month ?? new Date().getMonth() + 1) % 12
}

export const getNextPeriod = (lang: Locale = 'is') => {
  return {
    month: getMonth(nextMonth(), lang),
    year:
      nextMonth() === 0
        ? new Date().getFullYear() + 1
        : new Date().getFullYear(),
  }
}

export const apiBasePath = 'api/financial-aid'

export const applicationPageSize = 300
