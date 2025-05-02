import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('IntellectualPropertiesPriority')
export class Priority {
  @Field({ nullable: true })
  applicationDate?: Date

  @Field({ nullable: true })
  creationDate?: Date

  @Field({ nullable: true })
  number?: string

  @Field({ nullable: true })
  countryCode?: string

  @Field({ nullable: true })
  countryName?: string
}
