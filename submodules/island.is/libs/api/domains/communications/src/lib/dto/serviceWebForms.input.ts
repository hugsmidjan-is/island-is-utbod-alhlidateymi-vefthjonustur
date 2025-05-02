import { ServiceWebPage } from '@island.is/cms'
import { Field, HideField, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class ServiceWebFormsInput {
  @Field()
  @IsString()
  name!: string

  @Field()
  @IsString()
  email!: string

  @Field()
  @IsOptional()
  @IsString()
  subject?: string = 'N/A'

  @Field()
  @IsString()
  syslumadur!: string

  @Field()
  @IsString()
  category!: string

  @Field()
  @IsString()
  message!: string

  @Field()
  @IsString()
  institutionSlug!: string

  @HideField()
  @IsString()
  type = 'serviceWebForms' as const

  @Field()
  @IsOptional()
  @IsString()
  lang?: string = 'is-IS'
}

export type ServiceWebFormsInputWithInstitutionEmailAndConfig =
  ServiceWebFormsInput & {
    institutionEmail: string
    config: ServiceWebPage['emailConfig']
  }
