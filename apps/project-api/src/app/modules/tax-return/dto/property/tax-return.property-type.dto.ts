import { ApiProperty } from '@nestjs/swagger'

export class TaxReturnPropertyType {
  @ApiProperty({
    description: 'ID of the property type',
    required: true,
    nullable: false,
    type: String,
  })
  id!: string

  @ApiProperty({
    description: 'Name of the property type',
    required: true,
    nullable: false,
    type: String,
  })
  name!: string
}
