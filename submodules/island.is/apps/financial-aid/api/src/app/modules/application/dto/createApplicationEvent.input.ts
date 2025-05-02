import { Allow } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

import {
  CreateApplicationEvent,
  ApplicationEventType,
} from '@island.is/financial-aid/shared/lib'

@InputType()
export class CreateApplicationEventInput implements CreateApplicationEvent {
  @Allow()
  @Field()
  readonly applicationId!: string

  @Allow()
  @Field({ nullable: true })
  readonly comment?: string

  @Allow()
  @Field(() => String)
  readonly eventType!: ApplicationEventType

  @Allow()
  @Field({ nullable: true })
  readonly staffNationalId?: string

  @Allow()
  @Field({ nullable: true })
  readonly staffName?: string
}
