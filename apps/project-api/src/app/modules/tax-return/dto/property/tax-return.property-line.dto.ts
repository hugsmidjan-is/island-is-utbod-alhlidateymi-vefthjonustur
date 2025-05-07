import { ApiProperty } from '@nestjs/swagger'
import {
  IsOptional,
  MinLength,
  IsUUID,
  IsInt,
  Min,
  IsObject,
  ValidateNested,
} from 'class-validator'
import { TaxReturnPropertyType } from './tax-return.property-type.dto'
import { Type } from 'class-transformer'

export class TaxReturnPropertyLine {
  @ApiProperty({
    description: 'ID of the property line',
    type: String,
  })
  @IsOptional()
  @IsUUID()
  id!: string

  // @ApiProperty({
  //   description: 'ID of the property this line belongs to',
  //   type: String,
  // })
  // @IsOptional()
  // @IsUUID()
  // propertyId!: string

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
  @IsInt({ message: 'Value must be a positive integer' })
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
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => TaxReturnPropertyType)
  propertyType!: TaxReturnPropertyType
}
