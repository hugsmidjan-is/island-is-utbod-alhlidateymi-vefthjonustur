import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, MinLength, ValidateNested } from 'class-validator'
import { TaxReturnIncomeLine } from './income/tax-return.income-line.dto'

export class SubmitTaxReturnBody {
  @ApiProperty({
    required: true,
    description: 'Income lines',
    nullable: false,
    isArray: true,
    type: () => TaxReturnIncomeLine,
  })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  incomeLines!: TaxReturnIncomeLine[]
}
