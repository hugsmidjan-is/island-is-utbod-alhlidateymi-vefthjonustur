import { Allow } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

import {
  ApplicationState,
  ApplicationEventType,
} from '@island.is/financial-aid/shared/lib'

@InputType('MunicipalitiesFinancialAidUpdateApplicationInput')
export class UpdateApplicationInput {
  @Allow()
  @Field()
  readonly id!: string

  @Allow()
  @Field(() => String)
  readonly state!: ApplicationState

  @Allow()
  @Field(() => String)
  readonly event!: ApplicationEventType

  @Allow()
  @Field({ nullable: true })
  readonly comment?: string
}
