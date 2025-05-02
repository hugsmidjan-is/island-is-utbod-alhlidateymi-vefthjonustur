import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ElasticsearchIndexLocale } from '@island.is/content-search-index-manager'
import { CacheField } from '@island.is/nest/graphql'
import { SystemMetadata } from '@island.is/shared/types'
import { ILatestEventsSlice } from '../generated/contentfulTypes'
import { mapOrganization } from './organization.model'
import { GetEventsInput } from '../dto/getEvents.input'
import { Event as EventModel } from './event.model'

@ObjectType()
export class LatestEventsSlice {
  @Field(() => ID)
  id!: string

  @Field()
  title?: string

  @CacheField(() => [EventModel])
  events!: GetEventsInput
}

export const mapLatestEventsSlice = ({
  fields,
  sys,
}: ILatestEventsSlice): SystemMetadata<LatestEventsSlice> => ({
  typename: 'LatestEventsSlice',
  id: sys.id,
  title: fields.title ?? '',
  events: {
    lang:
      sys.locale === 'is-IS' ? 'is' : (sys.locale as ElasticsearchIndexLocale),
    size: 4,
    order: 'asc',
    organization: fields.organization
      ? mapOrganization(fields.organization).slug
      : undefined,
  },
})
