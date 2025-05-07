import { ApiProperty } from '@nestjs/swagger'
import { PersonPrefill } from './tax-return.person-prefill.dto'

export class GetPersonPrefillResponse {
  @ApiProperty({
    description: 'Tax return prefill for a person',
    required: true,
    type: PersonPrefill,
  })
  readonly prefill!: PersonPrefill
}

export class PostPersonSubmitResponse {
  @ApiProperty({
    description: 'Tax return submit response for a person',
    required: true,
    type: PersonPrefill,
  })
  readonly submit!: PersonPrefill
}

export class TaxReturnCreate {
  @ApiProperty({
    description: 'National ID of the person',
    required: true,
    type: String,
  })
  nationalId!: string

  @ApiProperty({
    description: 'Year of the tax return',
    required: true,
    type: Number,
  })
  year!: number

  @ApiProperty({
    description: 'ID of the tax return',
    required: true,
    type: String,
  })
  id!: string

  @ApiProperty({
    description: 'Timestamp of the tax return',
    required: true,
    type: Date,
  })
  timestamp!: Date
}
