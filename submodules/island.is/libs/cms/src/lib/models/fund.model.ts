import { Field, ObjectType, ID } from '@nestjs/graphql'

import { IFund } from '../generated/contentfulTypes'
import { CacheField } from '@island.is/nest/graphql'
import { ReferenceLink, mapReferenceLink } from './referenceLink.model'
import { Image, mapImage } from './image.model'
import { Organization, mapOrganization } from './organization.model'

@ObjectType('OrganizationFund')
export class Fund {
  @Field(() => ID)
  id!: string

  @Field()
  title!: string

  @CacheField(() => ReferenceLink, { nullable: true })
  link?: ReferenceLink

  @CacheField(() => Image, { nullable: true })
  featuredImage?: Image | null

  @CacheField(() => Organization)
  parentOrganization!: Organization
}

export const mapFund = ({ fields, sys }: IFund): Fund => ({
  id: sys.id,
  title: fields.fundTitle,
  link: fields.fundLink ? mapReferenceLink(fields.fundLink) : undefined,
  featuredImage: fields.fundFeaturedImage
    ? mapImage(fields.fundFeaturedImage)
    : undefined,
  parentOrganization: mapOrganization(fields.fundParentOrganization),
})
