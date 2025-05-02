import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

import { ApplicationEventType } from '@island.is/financial-aid/shared/lib'

export class CreateApplicationEventDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly applicationId: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly eventType: ApplicationEventType

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly comment?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly staffNationalId?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly staffName?: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly emailSent?: boolean
}
