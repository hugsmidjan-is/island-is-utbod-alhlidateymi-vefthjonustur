import { LOGGER_PROVIDER } from '@hxm/logging'

import { Test, TestingModule } from '@nestjs/testing'

import { FooController } from './foo.controller'
import { IFooService } from '../../services/IFooService'
import { MockFooService } from './foo.service.mock'

describe('FooController', () => {
  let foo: TestingModule
  let fooController: FooController

  beforeAll(async () => {
    foo = await Test.createTestingModule({
      controllers: [FooController],
      providers: [
        {
          provide: IFooService,
          useClass: MockFooService,
        },
        {
          provide: LOGGER_PROVIDER,
          useValue: {
            debug: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile()
    fooController = foo.get<FooController>(FooController)
  })

  describe('foo', () => {
    it('should test', async () => {
      const results = [1, 2]
      expect(results.length).toEqual(2)
    })
  })
})
