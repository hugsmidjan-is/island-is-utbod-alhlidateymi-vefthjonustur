import { IsDateString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class UpdatePublishDateBody {
  @ApiProperty({
    type: String,
  })
  @IsDateString()
  date!: string
}
