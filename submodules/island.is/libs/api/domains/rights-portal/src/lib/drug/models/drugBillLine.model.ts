import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('RightsPortalDrugBillLine')
export class DrugBillLine {
  @Field(() => ID, { nullable: true })
  billId?: number

  @Field(() => String, { nullable: true })
  drugName?: string

  @Field(() => String, { nullable: true })
  strength?: string

  @Field(() => String, { nullable: true })
  quantity?: string

  @Field(() => Number, { nullable: true })
  units?: number

  @Field(() => Number, { nullable: true })
  salesPrice?: number

  @Field(() => Number, { nullable: true })
  copaymentAmount?: number

  @Field(() => Number, { nullable: true })
  customerAmount?: number

  @Field(() => Number, { nullable: true })
  excessAmount?: number

  @Field(() => Number, { nullable: true })
  insuranceAmount?: number

  @Field(() => Number, { nullable: true })
  calculatedForPaymentStepAmount?: number
}
