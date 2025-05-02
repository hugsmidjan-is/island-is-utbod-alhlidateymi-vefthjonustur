import { ApiProperty } from '@nestjs/swagger'

import { PageInfoDto } from '@island.is/nest/pagination'

import { Session } from './session.model'

export class SessionsResultDto {
  @ApiProperty()
  totalCount!: number

  @ApiProperty({ type: [Session] })
  data!: Session[]

  @ApiProperty()
  pageInfo!: PageInfoDto
}
