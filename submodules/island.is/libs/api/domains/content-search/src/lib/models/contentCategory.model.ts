import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ContentCategory {
  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  description: string
}
