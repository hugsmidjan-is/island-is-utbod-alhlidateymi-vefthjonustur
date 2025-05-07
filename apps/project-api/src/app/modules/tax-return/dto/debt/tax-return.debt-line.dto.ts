import { ApiProperty } from '@nestjs/swagger'
import { TaxReturnDebtType } from './tax-return.debt-type.dto'
import {
  IsDateString,
  IsInt,
  IsObject,
  IsOptional,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

export class TaxReturnDebtLine {
  @ApiProperty({
    description: 'ID of the debt return line',
    nullable: false,
    type: String,
  })
  @IsOptional()
  @IsUUID()
  id!: string

  @ApiProperty({
    description: 'Debt type of the debt return, references the debt type list.',
    required: true,
    nullable: false,
    type: TaxReturnDebtType,
  })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => TaxReturnDebtType)
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
    type: String,
  })
  @IsOptional()
  @IsDateString()
  originationDate?: string

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
  @IsInt({ message: 'outstandingPrincipal must be a positive integer' })
  outstandingPrincipal!: number

  @ApiProperty({
    description: 'Optional interest amount of the debt return line',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'interestAmount must be a positive integer' })
  interestAmount?: number

  @ApiProperty({
    description: 'Optional annual total payment of the debt return line',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'annualTotalPayment must be a positive integer' })
  annualTotalPayment?: number

  @ApiProperty({
    description:
      'Optional annual total interest payment of the debt return line',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'annualTotalPrincipalPayment must be a positive integer' })
  annualTotalPrincipalPayment?: number

  @ApiProperty({
    description: 'Optional creditor id of the debt return line',
    type: String,
  })
  @IsOptional()
  creditorId?: string

  @ApiProperty({
    description: 'Optional creditor name of the debt return line',
    type: String,
  })
  @IsOptional()
  creditorName?: string

  @ApiProperty({
    description: 'Optional write-down of the debt return line',
    type: Number,
  })
  @IsOptional()
  writeDown?: number

  @ApiProperty({
    description: 'Optional currency of the debt return line',
    type: String,
    default: 'ISK',
  })
  @IsOptional()
  currency?: string
}
