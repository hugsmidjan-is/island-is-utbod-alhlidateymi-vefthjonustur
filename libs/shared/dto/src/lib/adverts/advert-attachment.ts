import { ApiProperty } from '@nestjs/swagger'

export class AdvertAttachment {
  @ApiProperty({
    description: 'File name for Attachment.',
    example: 'Viðauki.pdf',
    required: true,
    type: String,
  })
  readonly name!: string

  @ApiProperty({
    description: 'Type Attachment.',
    example: 'addendum',
    required: true,
    type: String,
  })
  readonly type!: string

  @ApiProperty({
    description: 'URL for Attachment.',
    example: '<url>',
    required: true,
    type: String,
  })
  readonly url!: string
}
