import { Allow } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'
import { CreateStaffInput } from '../../staff/dto'

@InputType()
export class CreateMunicipalityInput {
  @Allow()
  @Field()
  readonly name!: string

  @Allow()
  @Field()
  readonly municipalityId!: string

  @Allow()
  @Field({ nullable: true })
  readonly admin?: CreateStaffInput
}
