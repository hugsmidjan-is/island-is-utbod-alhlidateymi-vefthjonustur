import { ApiProperty } from '@nestjs/swagger'

import { CategoryMainCategory } from '../main-categories/category-main-category.dto'

export class Category {
  @ApiProperty({
    description: 'Unique ID for the advert category, GUID format.',
    example: '00000000-0000-0000-0000-000000000000',
    required: true,
    nullable: false,
    type: String,
  })
  readonly id!: string

  @ApiProperty({
    description: 'Title of the advert category.',
    example: 'Evrópska efnahagssvæðið',
    required: true,
    type: String,
  })
  readonly title!: string

  @ApiProperty({
    description: 'Slug of the advert category, used in URLs and API requests.',
    example: 'evropska-efnahagssvaedid',
    required: true,
    type: String,
  })
  readonly slug!: string

  @ApiProperty({
    description: 'The main category this category belongs to.',
    required: false,
    isArray: true,
    type: () => CategoryMainCategory,
    example: 'Dómstólar og réttarfar',
  })
  readonly mainCategories?: CategoryMainCategory[]
}
