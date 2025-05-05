import { Logger, LOGGER_PROVIDER } from '@hxm/logging'
import { UUIDValidationPipe } from '@hxm/pipelines'

import { Controller, Get, Inject, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { IFooService } from '../../services/IFooService'
import { GetFooResponse } from '../../services/foo-response.dto'

@Controller({
  version: '1',
})
export class FooController {
  constructor(
    @Inject(IFooService) private readonly fooService: IFooService,
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/foo/:id')
  @ApiOperation({ operationId: 'getFooById' })
  @ApiResponse({ status: 200, type: GetFooResponse })
  async advert(
    @Param('id', new UUIDValidationPipe()) id: string,
  ): Promise<GetFooResponse> {
    const result = await this.fooService.getFoo(id)

    if (!result.ok) {
      this.logger.error('Could not get foo', {
        error: result.error,
        category: 'foo',
        context: 'getFooById',
      })
      throw new Error(result.error.message)
    }
    return result.value
  }
}
