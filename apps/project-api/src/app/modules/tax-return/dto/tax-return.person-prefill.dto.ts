import { ApiProperty } from '@nestjs/swagger'
import { TaxReturnIncome } from './tax-return.income.dto'

export class PersonPrefill {
  @ApiProperty({
    description: 'National ID of the person',
    example: '1234567890',
    required: true,
    nullable: false,
    type: String,
  })
  nationalId!: string

  @ApiProperty({
    description: 'Income part of the tax return prefill',
    required: true,
    nullable: false,
    type: TaxReturnIncome,
  })
  income!: TaxReturnIncome
}
