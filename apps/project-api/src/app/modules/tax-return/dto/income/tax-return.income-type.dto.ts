import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class TaxReturnIncomeType {
  @ApiProperty({
    description: 'ID of the income return type',
    required: true,
    nullable: false,
    type: String,
  })
  @IsUUID()
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
