import {
  Field,
  MultiField,
  ExternalDataProvider,
  Repeater,
  FormNode,
  Schema,
  StaticText,
} from '@island.is/application/types'

type ScreenAttributes = {
  isNavigable?: boolean
  sectionIndex: number
  subSectionIndex: number
}

export type FieldDef = ScreenAttributes & Field

export type MultiFieldScreen = ScreenAttributes &
  MultiField & {
    children: FieldDef[]
  }

export type RepeaterScreen = ScreenAttributes &
  Repeater & {
    children: (FieldDef | MultiFieldScreen | RepeaterScreen)[]
  }

export type ExternalDataProviderScreen = ScreenAttributes & ExternalDataProvider

export type FormScreen =
  | FieldDef
  | ExternalDataProviderScreen
  | MultiFieldScreen
  | RepeaterScreen

export type ResolverContext = {
  formNode: FormNode
  dataSchema: Schema
}

export enum ScreenType {
  NEW,
  ONGOING,
  NOT_SUPPORTED,
  LOADING,
}

export type Delegation = {
  types: string[]
  from: {
    nationalId: string
    name: string
  }
}

export type DelegationsScreenDataType = {
  screenType: ScreenType
  allowedDelegations?: string[]
  authDelegations?: Delegation[]
  templateName?: StaticText
}

export const MOCKPAYMENT = 'shouldUseMockPayment'
