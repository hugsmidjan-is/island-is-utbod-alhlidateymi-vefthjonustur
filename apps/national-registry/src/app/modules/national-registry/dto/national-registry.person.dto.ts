import { ApiProperty } from '@nestjs/swagger'
import { Address } from './national-registry.address.dto'

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
