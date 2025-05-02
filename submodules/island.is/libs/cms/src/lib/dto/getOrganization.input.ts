import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class GetOrganizationInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  slug?: string

  @Field(() => String)
  @IsString()
  lang = 'is-IS'
}
