import { ApiProperty } from '@nestjs/swagger'
import { TaxReturnIncomeLine } from './tax-return.income-line.dto'

enum TaxReturnIncomeType {
  PREFILL = 'prefill',
  SUBMIT = 'submit',
}

export class TaxReturnIncome {
  @ApiProperty({
    description: 'ID of the income return',
    required: true,
    nullable: false,
    type: String,
  })
  id!: string

  @ApiProperty({
    required: true,
    description: 'Type of the income return, either `prefill` or `submit`',
    example: 'prefill',
    enum: TaxReturnIncomeType,
    nullable: false,
    type: TaxReturnIncomeType,
  })
  type!: 'prefill' | 'submit'

  // @ApiProperty({
  //   description:
  //     'Income type of the income return, references the income type list.',
  //   required: true,
  //   nullable: false,
  //   type: TaxReturnIncomeType,
  // })
  // incomeType!: TaxReturnIncomeType

  incomeLines!: TaxReturnIncomeLine[]
}
