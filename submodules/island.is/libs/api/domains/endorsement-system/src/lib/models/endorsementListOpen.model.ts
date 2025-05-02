import { Field, ObjectType, ID } from '@nestjs/graphql'
import { EndorsementListOpenTagsEnum } from '../enums/endorsementListOpenTagsEnum'

@ObjectType()
export class EndorsementListOpen {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field()
  title!: string

  @Field(() => String, { nullable: true })
  description!: string | null

  @Field(() => [EndorsementListOpenTagsEnum], { nullable: true })
  tags?: EndorsementListOpenTagsEnum[]

  @Field(() => Date)
  closedDate!: Date

  @Field(() => Date)
  openedDate!: Date

  @Field(() => Boolean)
  adminLock!: boolean
}
