import { ApiProperty } from '@nestjs/swagger'
import { Person } from './national-registry.person.dto'

export class GetPersonResponse {
  @ApiProperty({
    description: 'Person',
    required: true,
    type: Person,
  })
  readonly person!: Person
}
