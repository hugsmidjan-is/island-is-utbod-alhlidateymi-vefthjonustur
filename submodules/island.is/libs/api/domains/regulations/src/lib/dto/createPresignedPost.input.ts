import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreateRegulationPresignedPostInput {
  @Field()
  @IsString()
  readonly fileName!: string
  @Field()
  @IsString()
  readonly regId!: string
  @Field()
  readonly hash?: string
}
