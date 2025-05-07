import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class TaxReturnPropertyType {
  @ApiProperty({
    description: 'ID of the property type',
    required: true,
    nullable: false,
    type: String,
  })
  @IsUUID()
  id!: string

  @ApiProperty({
    description: 'Name of the property type',
    required: true,
    nullable: false,
    type: String,
  })
  name!: string
}
