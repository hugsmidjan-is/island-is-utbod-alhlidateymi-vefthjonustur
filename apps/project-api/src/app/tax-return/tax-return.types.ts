import { ApiProperty, ApiResponse } from '@nestjs/swagger'
import { PersonNotFound } from '../national-registry/national-registry.dto'
import { Result } from '../../types'

export type LocalizedString = {
  en: string
  is: string
}

export type TaxReturnCurrency = 'ISK'

export type TaxReturnItemAmount = {
  amount: number
  currency: TaxReturnCurrency
}

export type TaxReturnItem = {
  id: string
  label: string
  amount: TaxReturnItemAmount
}

export type IncomeEmployment = {
  number: string
  label: LocalizedString
  items: Array<TaxReturnItem>
}

export type AllowancesAndBenefits = {
  number: string
  label: LocalizedString
  items: Array<TaxReturnItem>
}

//----

const incomeEmployment: IncomeEmployment = {
  number: '2.1',
  label: {
    en: 'Wages and employment-related payments',
    is: 'Launatekjur og starfstengdar greiðslur',
  },
  items: [
    {
      id: '1',
      label: 'Norðurljós Software ehf',
      amount: {
        amount: 9360000,
        currency: 'ISK',
      },
    },
    {
      id: '2',
      label: 'Mús & Merki ehf.',
      amount: {
        amount: 960000,
        currency: 'ISK',
      },
    },
  ],
}

export class PersonPrefill {
  nationalId!: string
  incomeEmployment!: IncomeEmployment
  // allowancesAndBenefits!: AllowancesAndBenefits
}

@ApiResponse({
  status: 404,
  description: 'Person not found',
  type: PersonNotFound,
})
export class GetPersonPrefillResponse {
  @ApiProperty({
    description: 'PersonPrefill',
    required: true,
    type: PersonPrefill,
  })
  readonly prefill!: PersonPrefill
}

export interface ITaxReturnService {
  // TODO nationalId should be from token
  // TODO nationaId in GET can leak PII
  getPersonPrefill(
    nationalId: string,
  ): Promise<Result<GetPersonPrefillResponse>>
}

export const ITaxReturnService = Symbol('ITaxReturnService')
