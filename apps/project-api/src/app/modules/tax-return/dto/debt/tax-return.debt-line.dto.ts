import { ApiProperty } from '@nestjs/swagger'
import { TaxReturnDebtType } from './tax-return.debt-type.dto'
import { IsInt, IsOptional, Min, MinLength } from 'class-validator'

export class TaxReturnDebtLine {
  @ApiProperty({
    description: 'ID of the debt return line',
    nullable: false,
    type: String,
  })
  @IsOptional()
  id!: string

  @ApiProperty({
    description: 'Debt type of the debt return, references the debt type list.',
    required: true,
    nullable: false,
    type: TaxReturnDebtType,
  })
  debtType!: TaxReturnDebtType

  @ApiProperty({
    description: 'Label of the debt return line',
    required: true,
    nullable: false,
    type: String,
  })
  @MinLength(1, {
    message: 'Label must be at least 1 character long',
  })
  label!: string

  @ApiProperty({
    description: 'Optional originating date of the debt return line',
    type: Date,
  })
  @IsOptional()
  originationDate?: Date

  @ApiProperty({
    description: 'Optional identifier of the debt return line',
    type: String,
  })
  @IsOptional()
  identifier?: string

  @ApiProperty({
    description: 'Term of the debt return line',
    type: Number,
  })
  @IsOptional()
  term?: number

  @ApiProperty({
    description: 'Outstanding principal of the debt return line',
    required: true,
    nullable: false,
    type: Number,
  })
  outstandingPrincipal!: number

  @ApiProperty({
    description: 'Optional interest amount of the debt return line',
    type: Number,
  })
  @IsOptional()
  interestAmount?: number

  @ApiProperty({
    description: 'Optional annual total payment of the debt return line',
    type: Number,
  })
  @IsOptional()
  annualTotalPayment?: number

  @ApiProperty({
    description:
      'Optional annual total interest payment of the debt return line',
    type: Number,
  })
  @IsOptional()
  annualTotalPrincipalPayment?: number

  @ApiProperty({
    description: 'Optional creditor id of the debt return line',
    type: String,
  })
  creditorId?: string

  @ApiProperty({
    description: 'Optional currency of the debt return line',
    type: String,
    default: 'ISK',
  })
  currency?: string
}
