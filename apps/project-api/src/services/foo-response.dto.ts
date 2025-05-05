import { ApiProperty, ApiResponse } from '@nestjs/swagger'
import { Foo } from './foo.dto'

@ApiResponse({
  status: 404,
  description: 'Foo not found',
  type: Foo,
})
export class GetFooResponse {
  @ApiProperty({
    description: 'Foo',
    required: true,
    type: Foo,
  })
  readonly foo!: Foo
}
