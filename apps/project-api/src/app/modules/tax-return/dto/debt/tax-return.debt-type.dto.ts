import { ApiProperty } from '@nestjs/swagger'

export class TaxReturnDebtType {
  @ApiProperty({
    description: 'ID of the debt type',
    required: true,
    nullable: false,
    type: String,
  })
  id!: string

  @ApiProperty({
    description: 'Name of the debt type',
    required: true,
    nullable: false,
    type: String,
  })
  name!: string
}
