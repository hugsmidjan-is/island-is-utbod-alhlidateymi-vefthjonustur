import { createApplication } from '@island.is/application/testing'
import { CarRecyclingClientService } from '@island.is/clients/car-recycling'
import { Test, TestingModule } from '@nestjs/testing'
import { CarRecyclingService } from './car-recycling.service'
import { createCurrentUser } from '@island.is/testing/fixtures'
import { LOGGER_PROVIDER, logger } from '@island.is/logging'
import { VehicleSearchApi } from '@island.is/clients/vehicles'

describe('CarRecyclingService', () => {
  let carRecyclingService: CarRecyclingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarRecyclingService,
        {
          provide: LOGGER_PROVIDER,
          useValue: logger,
        },
        {
          provide: CarRecyclingClientService,
          useClass: jest.fn(() => ({
            sendApplication: () =>
              Promise.resolve({
                applicationLineId: '123A',
              }),
          })),
        },
        VehicleSearchApi,
      ],
    }).compile()

    carRecyclingService = module.get<CarRecyclingService>(CarRecyclingService)
  })

  it('should send car recycling application', async () => {
    const auth = createCurrentUser()
    const application = createApplication({
      answers: {
        'vehicles.selectedVehicles': [
          {
            permno: 'AH-H32',
          },
        ],
        'vehicles.canceledVehicles': [],
      },
    })

    // Also need to mock the Create vehicles here
    jest.spyOn(carRecyclingService, 'createOwner').mockImplementation(jest.fn())

    // Also need to mock the Create vehicles here
    jest
      .spyOn(carRecyclingService, 'createVehicle')
      .mockImplementation(jest.fn())

    // Also need to mock the recycling vehicles
    jest
      .spyOn(carRecyclingService, 'recycleVehicle')
      .mockImplementation(jest.fn())

    const result = await carRecyclingService.sendApplication({
      application,
      auth,
      currentUserLocale: 'is',
    })

    expect(result).toBeTruthy()
  })
})
