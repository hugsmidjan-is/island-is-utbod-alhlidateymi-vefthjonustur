import { ApiProperty, ApiResponse } from '@nestjs/swagger'
import { Length, IsString } from 'class-validator'

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

export class Person {
  @ApiProperty({
    description: 'Name of the person',
    example: 'Jón Jónsson',
    required: true,
    nullable: false,
    type: String,
  })
  readonly name!: string

  @ApiProperty({
    description: 'National ID of the person',
    example: '1234567890',
    required: true,
    nullable: false,
    type: String,
  })
  readonly nationalId!: string

  @ApiProperty({
    description: 'Email address of the person',
    example: 'nn@example.org',
    required: false,
    nullable: true,
    type: String,
  })
  readonly email?: string
  @ApiProperty({
    description: 'Phone number of the person',
    example: '+354 333 4567',
    required: false,
    nullable: true,
    type: String,
  })
  readonly phoneNumber?: string

  @ApiProperty({
    description: 'Address of the person',
    required: false,
    nullable: true,
    type: Address,
  })
  readonly address?: Address
}

export class PersonNotFound {
  @ApiProperty({
    description: 'Error message',
    example: 'Person not found',
    required: true,
    nullable: false,
    type: String,
  })
  readonly message!: string
}

@ApiResponse({
  status: 404,
  description: 'Person not found',
  type: PersonNotFound,
})
export class GetPersonResponse {
  @ApiProperty({
    description: 'Person',
    required: true,
    type: Person,
  })
  readonly person!: Person
}
