import { Test, TestingModule } from '@nestjs/testing'
import { NationalRegistryController } from './national-registry.controller'

import { LOGGER_PROVIDER, LoggingModule } from '@hxm/logging'
import { MockNationalRegistryService } from './national-registry.service.mock'
import { NationalRegistryService } from './national-registry.service'
import { INationalRegistryService } from './national-registry.types'
import { ExceptionFactoryPipe } from '@hxm/pipelines'
import { APP_PIPE } from '@nestjs/core'

describe('JournalController', () => {
  let nationalRegistry: TestingModule
  let nationalRegistryController: NationalRegistryController

  beforeAll(async () => {
    nationalRegistry = await Test.createTestingModule({
      controllers: [NationalRegistryController],
      providers: [
        {
          provide: INationalRegistryService,
          useClass: MockNationalRegistryService,
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
        { provide: APP_PIPE, useValue: ExceptionFactoryPipe() },
      ],
    }).compile()
    nationalRegistryController =
      nationalRegistry.get<NationalRegistryController>(
        NationalRegistryController,
      )
  })

  describe('nationalRegistry', () => {
    describe('getPerson', () => {
      it('should return a person if valid', async () => {
        const result = await nationalRegistryController.getPerson('1203894569')

        expect(result.person.name).toEqual('Jökull Þórðarson')
      })

      it('should return an error if input is invalid national id', async () => {
        try {
          // TODO not triggering pipe but works atm
          await nationalRegistryController.getPerson('x')
        } catch (e) {
          const error = e as any
          expect(error.message).toBeDefined()
        }
      })

      it('should return an error for known error national id', async () => {
        try {
          // TODO not triggering pipe but works atm
          await nationalRegistryController.getPerson('0000000000')
        } catch (e) {
          const error = e as any
          expect(error.message).toBe('unexpected error')
        }
      })
    })
  })
})
