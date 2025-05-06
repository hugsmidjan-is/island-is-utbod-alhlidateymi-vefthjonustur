import { ApiProperty } from '@nestjs/swagger'
import { TaxReturnIncomeType } from './tax-return.income-type.dto'

export class TaxReturnIncomeLine {
  @ApiProperty({
    description: 'ID of the income return line',
    required: true,
    nullable: false,
    type: String,
  })
  id!: string

  @ApiProperty({
    description:
      'Income type of the income return, references the income type list.',
    required: true,
    nullable: false,
    type: TaxReturnIncomeType,
  })
  incomeType!: TaxReturnIncomeType

  @ApiProperty({
    description: 'Label of the income return line',
    required: true,
    nullable: false,
    type: String,
  })
  label!: string

  @ApiProperty({
    description: 'Optional payer of the income return line',
    required: true,
    nullable: true,
    type: String,
  })
  payer?: string

  @ApiProperty({
    description: 'Value of the income return line',
    required: true,
    nullable: false,
    type: Number,
  })
  value!: number
}
