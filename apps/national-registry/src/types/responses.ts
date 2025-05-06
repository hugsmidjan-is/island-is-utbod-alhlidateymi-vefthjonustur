import { ApiProperty } from '@nestjs/swagger'

export class BadRequestResponse {
  @ApiProperty({
    description: 'Message describing the error',
    required: true,
    type: String,
  })
  readonly message!: string

  @ApiProperty({
    description: 'Error description',
    required: false,
    type: String,
  })
  readonly error?: string

  @ApiProperty({
    description: 'Error code',
    required: false,
    type: String,
  })
  readonly code?: number
}

export class NotFoundResponse {
  @ApiProperty({
    description: 'Message describing the error',
    required: true,
    type: String,
  })
  readonly message!: string

  @ApiProperty({
    description: 'Error description',
    required: false,
    type: String,
  })
  readonly error?: string

  @ApiProperty({
    description: 'Error code',
    required: false,
    type: String,
  })
  readonly code?: number
}

export class InternalServerErrorResponse {
  @ApiProperty({
    description: 'Message describing the error',
    required: true,
    type: String,
  })
  readonly message!: string

  @ApiProperty({
    description: 'Error description',
    required: false,
    type: String,
  })
  readonly error?: string

  @ApiProperty({
    description: 'Error code',
    required: false,
    type: String,
  })
  readonly code?: number
}
