import { Field, InputType } from '@nestjs/graphql'

@InputType('RightsPortalHealthCenterRegisterInput')
export class HealthCenterRegisterInput {
  @Field(() => String)
  id!: string

  @Field(() => Number, { nullable: true })
  doctorId?: number
}
