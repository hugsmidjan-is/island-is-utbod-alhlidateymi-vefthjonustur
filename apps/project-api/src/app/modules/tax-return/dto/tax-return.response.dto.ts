import { ApiProperty } from '@nestjs/swagger'
import { PersonPrefill } from './tax-return.person-prefill.dto'

export class GetPersonPrefillResponse {
  @ApiProperty({
    description: 'PersonPrefill',
    required: true,
    type: PersonPrefill,
  })
  readonly prefill!: PersonPrefill
}
