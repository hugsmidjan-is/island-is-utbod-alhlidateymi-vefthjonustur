import { ApiProperty } from '@nestjs/swagger'
import { TaxReturnIncomeType } from './tax-return.income-type.dto'
import { IsInt, IsOptional, Min, MinLength } from 'class-validator'

export class TaxReturnIncomeLine {
  @ApiProperty({
    description: 'ID of the income return line',
    nullable: false,
    type: String,
  })
  @IsOptional()
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
  @MinLength(1, {
    message: 'Label must be at least 1 character long',
  })
  label!: string

  @ApiProperty({
    description: 'Optional payer of the income return line',
    required: true,
    nullable: true,
    type: String,
  })
  @IsOptional()
  payer?: string

  @ApiProperty({
    description: 'Value of the income return line',
    required: true,
    nullable: false,
    type: Number,
  })
  @IsInt({ message: 'Value must be a positive integer' })
  @Min(1, {
    message: 'Value must be a positive integer',
  })
  value!: number
}
