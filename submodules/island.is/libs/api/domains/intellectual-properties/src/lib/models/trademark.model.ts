import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Person } from './person.model'
import { ApplicationLifecycle } from './applicationLifecycle.model'
import { Media } from './media.model'
import { Category } from './category.model'
import { IntellectualProperty } from './intellectualProperty.model'

export enum TrademarkSubType {
  TRADEMARK = 'Trademark',
  CERTIFICATION_MARK = 'CertificationMark',
  COLLECTIVE_MARK = 'CollectiveMark',
}

export enum TrademarkType {
  AUDIO = 'Audio',
  ANIMATION = 'Animation',
  MULTIMEDIA = 'Multimedia',
  TEXT = 'Text',
  TEXT_AND_IMAGE = 'TextAndImage',
  IMAGE = 'Image',
  UNKNOWN = 'Unknown',
}

registerEnumType(TrademarkType, { name: 'TrademarkType' })
registerEnumType(TrademarkSubType, { name: 'TrademarkSubType' })

@ObjectType('IntellectualPropertiesTrademark', {
  implements: () => IntellectualProperty,
})
export class Trademark implements IntellectualProperty {
  @Field()
  id!: string

  @Field(() => String, { nullable: true })
  text?: string

  @Field(() => TrademarkType, { nullable: true })
  type?: TrademarkType

  @Field(() => String, { nullable: true })
  typeReadable?: string

  @Field(() => TrademarkSubType, { nullable: true })
  subType?: TrademarkSubType

  @Field(() => String, { nullable: true })
  applicationNumber?: string

  @Field(() => String, { nullable: true })
  registrationNumber?: string

  @Field(() => String, { nullable: true })
  status?: string

  @Field(() => [Person], { nullable: true })
  markOwners?: Array<Person>

  @Field(() => [Category], { nullable: true })
  markCategories?: Array<Category>

  @Field(() => Person, { nullable: true })
  markAgent?: Person

  @Field(() => ApplicationLifecycle)
  lifecycle?: ApplicationLifecycle

  @Field({ nullable: true })
  isColorMark?: boolean

  @Field(() => String, { nullable: true })
  imageCategories?: string

  @Field({ nullable: true })
  deleted?: boolean

  @Field(() => Media, { nullable: true })
  media?: Media

  @Field({ nullable: true })
  canRenew?: boolean
}
