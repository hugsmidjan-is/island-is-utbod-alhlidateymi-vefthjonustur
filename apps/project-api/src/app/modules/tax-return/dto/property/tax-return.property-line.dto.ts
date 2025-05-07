import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, MinLength, IsNumber, IsUUID } from 'class-validator'
import { TaxReturnPropertyType } from './tax-return.property-type.dto'

export class TaxReturnPropertyLine {
  @ApiProperty({
    description: 'ID of the property line',
    nullable: false,
    type: String,
  })
  @IsOptional()
  @IsUUID()
  id!: string

  @ApiProperty({
    description: 'ID of the property this line belongs to',
    required: true,
    nullable: false,
    type: String,
  })
  @IsUUID()
  propertyId!: string

  @ApiProperty({
    description: 'Label of the property line',
    required: true,
    nullable: false,
    type: String,
  })
  @MinLength(1, {
    message: 'Label must be at least 1 character long',
  })
  label!: string

  @ApiProperty({
    description: 'Identifier of the property line',
    required: true,
    nullable: false,
    type: String,
  })
  @MinLength(1, {
    message: 'Identifier must be at least 1 character long',
  })
  identifier!: string

  @ApiProperty({
    description: 'Value of the property line',
    required: true,
    nullable: false,
    type: Number,
  })
  @IsNumber()
  value!: number

  @ApiProperty({
    description: 'Currency of the property line',
    type: String,
    default: 'ISK',
  })
  @IsOptional()
  currency?: string

  @ApiProperty({
    description: 'Property type this line belongs to',
    required: true,
    nullable: false,
    type: TaxReturnPropertyType,
  })
  propertyType!: TaxReturnPropertyType
}
