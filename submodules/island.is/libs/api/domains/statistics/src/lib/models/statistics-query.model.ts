import { Field, ObjectType } from '@nestjs/graphql'
import { CacheField } from '@island.is/nest/graphql'

@ObjectType('StatisticKeyValue')
class StatisticKeyValue {
  @Field(() => String)
  key!: string

  @Field(() => Number, { nullable: true })
  value!: number | null
}

@ObjectType('StatisticsForHeader')
class StatisticsForHeader {
  @Field(() => String)
  header!: string

  @Field(() => String)
  headerType!: string

  @Field(() => [StatisticKeyValue])
  statisticsForHeader!: StatisticKeyValue[]
}

@ObjectType('StatisticsQueryResponse')
export class StatisticsQueryResponse {
  @CacheField(() => [StatisticsForHeader])
  statistics!: StatisticsForHeader[]
}
