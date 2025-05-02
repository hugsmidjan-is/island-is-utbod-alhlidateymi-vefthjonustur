import { Field, ID, ObjectType } from '@nestjs/graphql'
import { SignatureCollectionCandidate } from './candidate.model'
import { SignatureCollectionArea } from './area.model'
import { SignatureCollectionCollector } from './collector.model'

@ObjectType()
export class SignatureCollectionOwnedList {
  @Field(() => ID)
  id!: string

  @Field()
  title!: string

  @Field(() => SignatureCollectionArea)
  area!: SignatureCollectionArea
}

@ObjectType()
export class SignatureCollectionListBase {
  @Field(() => ID)
  id!: string

  @Field()
  title!: string

  @Field(() => SignatureCollectionArea)
  area!: SignatureCollectionArea

  @Field(() => Date)
  endTime!: Date

  @Field(() => Date)
  startTime!: Date

  @Field(() => Boolean, { nullable: true })
  active?: boolean

  @Field()
  collectionId!: string

  @Field()
  slug!: string

  @Field({ nullable: true })
  numberOfSignatures?: number

  @Field()
  maxReached!: boolean

  @Field()
  reviewed!: boolean
}

@ObjectType()
export class SignatureCollectionList extends SignatureCollectionListBase {
  @Field(() => SignatureCollectionCandidate)
  candidate!: SignatureCollectionCandidate

  @Field(() => [SignatureCollectionCollector], { nullable: true })
  collectors?: SignatureCollectionCollector[]
}

@ObjectType()
export class SignatureCollectionSignedList extends SignatureCollectionListBase {
  @Field(() => Date)
  signedDate!: Date

  @Field(() => Boolean)
  isDigital!: boolean

  @Field(() => Boolean)
  canUnsign!: boolean

  @Field(() => Boolean)
  isValid!: boolean

  @Field(() => Number, { nullable: true })
  pageNumber?: number
}
