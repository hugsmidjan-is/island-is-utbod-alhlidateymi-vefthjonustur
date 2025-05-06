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
