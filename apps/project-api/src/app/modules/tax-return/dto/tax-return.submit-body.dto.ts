import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, MinLength, ValidateNested } from 'class-validator'
import { TaxReturnIncomeLine } from './income/tax-return.income-line.dto'
import { TaxReturnPropertyLine } from './property/tax-return.property-line.dto'
import { TaxReturnDebtLine } from './debt/tax-return.debt-line.dto'

export class SubmitTaxReturnBody {
  @ApiProperty({
    required: true,
    description: 'Email of the person',
    nullable: false,
    type: String,
  })
  email!: string

  @ApiProperty({
    required: true,
    description: 'Phone number of the person',
    nullable: false,
    type: String,
  })
  phonenumber!: string

  @ApiProperty({
    required: true,
    description: 'Income lines',
    nullable: false,
    isArray: true,
    type: () => TaxReturnIncomeLine,
  })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TaxReturnIncomeLine)
  incomeLines!: TaxReturnIncomeLine[]

  @ApiProperty({
    required: true,
    description: 'Property lines',
    nullable: false,
    isArray: true,
    type: () => TaxReturnPropertyLine,
  })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TaxReturnPropertyLine)
  propertyLines!: TaxReturnPropertyLine[]

  @ApiProperty({
    required: true,
    description: 'Debt lines',
    nullable: false,
    isArray: true,
    type: () => TaxReturnDebtLine,
  })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TaxReturnDebtLine)
  debtLines!: TaxReturnDebtLine[]
}
