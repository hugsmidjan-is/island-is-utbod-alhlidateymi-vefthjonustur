import { Field, ObjectType } from '@nestjs/graphql'
import { AccidentNotificationAttachment } from './accidentNotificationAttachment.model'
import { AccidentNotificationConfirmation } from './accidentNotificationConfirmation.model'
import { IsEnum } from 'class-validator'
import { HealthInsuranceAccidentNotificationStatusTypes } from '../../types'

@ObjectType()
export class AccidentNotificationStatus {
  @Field(() => Number)
  numberIHI?: number

  @Field(() => HealthInsuranceAccidentNotificationStatusTypes)
  @IsEnum(HealthInsuranceAccidentNotificationStatusTypes)
  status?: HealthInsuranceAccidentNotificationStatusTypes

  @Field(() => AccidentNotificationAttachment, { nullable: true })
  receivedAttachments?: AccidentNotificationAttachment

  @Field(() => AccidentNotificationConfirmation, { nullable: true })
  receivedConfirmations?: AccidentNotificationConfirmation
}
