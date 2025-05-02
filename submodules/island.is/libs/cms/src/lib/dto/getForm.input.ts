import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class GetFormInput {
  @Field()
  @IsString()
  id!: string

  @Field(() => String)
  @IsString()
  lang = 'is-IS'
}
