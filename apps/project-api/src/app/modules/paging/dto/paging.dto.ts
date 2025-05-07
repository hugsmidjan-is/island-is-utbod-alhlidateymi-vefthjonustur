import { ApiProperty } from '@nestjs/swagger'
import { PageInfoDto } from './pageinfo.dto'

export class Paging<T> {
  @ApiProperty({ isArray: true })
  data!: T[]

  @ApiProperty({ type: PageInfoDto })
  pageInfo!: PageInfoDto

  @ApiProperty({ type: Number })
  totalCount!: number
}
