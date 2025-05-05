import { Expose, Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@hxm/constants'

import { ApiProperty } from '@nestjs/swagger'

export class PagingQuery {
  @ApiProperty({
    required: false,
    type: Number,
    example: 1,
  })
  @IsOptional()
  @Expose()
  @Transform(({ value }) => {
    const val = value ? parseInt(value) : DEFAULT_PAGE_NUMBER
    if (Number.isNaN(val)) {
      return DEFAULT_PAGE_NUMBER
    }

    return val
  })
  page!: number

  @ApiProperty({
    required: false,
    type: Number,
    example: 10,
  })
  @IsOptional()
  @Expose()
  @Transform(({ value }) => {
    const val = value ? parseInt(value) : DEFAULT_PAGE_SIZE
    if (Number.isNaN(val)) {
      return DEFAULT_PAGE_NUMBER
    }

    return val
  })
  pageSize!: number
}
