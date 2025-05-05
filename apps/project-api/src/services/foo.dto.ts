import { ApiProperty } from '@nestjs/swagger'

export class Foo {
  @ApiProperty({
    description: 'Unique ID for the advert, GUID format.',
    example: '00000000-0000-0000-0000-000000000000',
    required: true,
    nullable: false,
    type: String,
  })
  readonly id!: string
}
