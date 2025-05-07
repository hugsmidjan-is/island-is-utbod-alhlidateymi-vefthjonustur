import { ApiProperty } from '@nestjs/swagger'

export class TaxReturnIncomeType {
  @ApiProperty({
    description: 'ID of the income return type',
    required: true,
    nullable: false,
    type: String,
  })
  id!: string

  @ApiProperty({
    description: 'Code of the income return type',
    required: true,
    nullable: false,
    type: String,
  })
  code!: string

  @ApiProperty({
    description: 'Name of the income return type',
    required: true,
    nullable: false,
    type: String,
  })
  name!: string
}
