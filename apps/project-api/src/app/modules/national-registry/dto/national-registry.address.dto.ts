import { ApiProperty } from '@nestjs/swagger'

export class Address {
  @ApiProperty({
    description: 'Street address',
    example: 'Lækjargata 1',
    required: true,
    nullable: false,
    type: String,
  })
  readonly streetAddress!: string

  @ApiProperty({
    description: 'Postal code',
    example: '101',
    required: true,
    nullable: false,
    type: String,
  })
  readonly postalCode!: string

  @ApiProperty({
    description: 'City',
    example: 'Reykjavík',
    required: true,
    nullable: false,
    type: String,
  })
  readonly city!: string
}
