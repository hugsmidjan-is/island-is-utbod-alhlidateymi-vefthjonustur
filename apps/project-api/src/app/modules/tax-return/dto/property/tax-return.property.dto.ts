import { ApiProperty } from '@nestjs/swagger'
import { TaxReturnPropertyLine } from './tax-return.property-line.dto'

enum TaxReturnPropertyType {
  PREFILL = 'prefill',
  SUBMIT = 'submit',
}

export class TaxReturnProperty {
  @ApiProperty({
    description: 'ID of the property return',
    required: true,
    nullable: false,
    type: String,
  })
  id!: string

  @ApiProperty({
    required: true,
    description: 'Type of the property return, either `prefill` or `submit`',
    example: 'prefill',
    enum: TaxReturnPropertyType,
    nullable: false,
    type: TaxReturnPropertyType,
  })
  type!: 'prefill' | 'submit'

  @ApiProperty({
    required: true,
    description: 'Property lines',
    nullable: false,
    isArray: true,
    type: () => TaxReturnPropertyLine,
  })
  propertyLines!: TaxReturnPropertyLine[]
}
