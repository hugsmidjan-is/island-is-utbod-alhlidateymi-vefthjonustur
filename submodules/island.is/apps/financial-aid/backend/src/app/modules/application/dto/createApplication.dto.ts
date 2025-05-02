import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
  IsUUID,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

import {
  HomeCircumstances,
  Employment,
  ApplicationState,
  FamilyStatus,
  CreateApplicationFile,
  DirectTaxPayment,
  Children,
} from '@island.is/financial-aid/shared/lib'

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly nationalId: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly phoneNumber: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly homeCircumstances: HomeCircumstances

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly homeCircumstancesCustom: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly employment: Employment

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly employmentCustom: string

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly student: boolean

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly studentCustom: string

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly usePersonalTaxCredit: boolean

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly bankNumber: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly ledger: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly accountNumber: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly interview: boolean

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly hasIncome: boolean

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly formComment: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly childrenComment: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly state: ApplicationState

  @IsArray()
  @ApiProperty()
  readonly files: CreateApplicationFile[]

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly amount: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly spouseName: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly spouseNationalId: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly spouseEmail: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly spousePhoneNumber: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly spouseFormComment: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly familyStatus: FamilyStatus

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly city: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly postalCode: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly municipalityCode: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly streetName: string

  @IsArray()
  @ApiProperty()
  readonly directTaxPayments: DirectTaxPayment[]

  @IsArray()
  @ApiProperty()
  readonly children: Children[]

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  readonly applicationSystemId: string

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly hasFetchedDirectTaxPayment: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly spouseHasFetchedDirectTaxPayment: boolean
}
