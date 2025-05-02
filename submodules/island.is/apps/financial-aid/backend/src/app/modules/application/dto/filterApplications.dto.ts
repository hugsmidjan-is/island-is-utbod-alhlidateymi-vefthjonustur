import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { ApplicationState } from '@island.is/financial-aid/shared/lib'

export class FilterApplicationsDto {
  @IsArray()
  @ApiProperty()
  readonly defaultStates: ApplicationState[]

  @IsArray()
  @ApiProperty()
  readonly states: ApplicationState[]

  @IsArray()
  @ApiProperty()
  readonly staff: string[]

  @IsNumber()
  @ApiProperty()
  readonly page: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly startDate?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly endDate?: string
}
