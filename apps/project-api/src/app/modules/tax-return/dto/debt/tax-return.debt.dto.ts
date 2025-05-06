import { ApiProperty } from '@nestjs/swagger'
import { TaxReturnDebtLine } from './tax-return.debt-line.dto'

enum TaxReturnDebtType {
  PREFILL = 'prefill',
  SUBMIT = 'submit',
}

export class TaxReturnDebt {
  @ApiProperty({
    description: 'ID of the debt return',
    required: true,
    nullable: false,
    type: String,
  })
  id!: string

  @ApiProperty({
    required: true,
    description: 'Type of the debt return, either `prefill` or `submit`',
    example: 'prefill',
    enum: TaxReturnDebtType,
    nullable: false,
    type: TaxReturnDebtType,
  })
  type!: 'prefill' | 'submit'

  @ApiProperty({
    required: true,
    description: 'Debt lines',
    nullable: false,
    isArray: true,
    type: () => TaxReturnDebtLine,
  })
  debtLines!: TaxReturnDebtLine[]
}
