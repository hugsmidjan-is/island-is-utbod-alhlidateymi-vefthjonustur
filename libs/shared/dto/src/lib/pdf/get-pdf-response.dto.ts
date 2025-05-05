import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class GetPdfRespone {
  @ApiProperty({
    type: String,
    description: 'Base64 encoded PDF',
  })
  content!: string
}

export class GetPdfBody {
  @ApiProperty({
    type: Boolean,
    required: false,
    default: true,
    description: 'Show date in PDF',
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  showDate?: boolean
}
