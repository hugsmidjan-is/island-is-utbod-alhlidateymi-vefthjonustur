import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'

import { FlightService, ADS_POSTAL_CODES } from '../../flight.service'
import { Flight, FlightLeg } from '../../flight.model'
import { ExplicitCode } from '../../../discount/discount.model'
import { NationalRegistryService } from '../../../nationalRegistry'

describe('PublicFlightController', () => {
  let flightService: FlightService
  let flightModel: Flight

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FlightService,
        {
          provide: NationalRegistryService,
          useClass: jest.fn(() => ({
            getUser: () => ({}),
          })),
        },
        {
          provide: getModelToken(Flight),
          useClass: jest.fn(() => ({
            count: () => ({}),
          })),
        },
        {
          provide: getModelToken(FlightLeg),
          useClass: jest.fn(() => ({})),
        },
        {
          provide: getModelToken(ExplicitCode),
          useClass: jest.fn(() => ({})),
        },
      ],
    }).compile()

    flightService = moduleRef.get<FlightService>(FlightService)
    flightModel = moduleRef.get<Flight>(getModelToken(Flight))
  })

  describe('isADSPostalCode', () => {
    const postalCodeBetween = (code1: number, code2: number): number =>
      Math.floor(Math.min(code1, code2) + Math.abs(code1 - code2) / 2)

    it('should not allow Reykjavík', async () => {
      const postalCode = 101
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(false)
    })

    it('should not allow anything below Reykhólahreppur', async () => {
      const postalCode = ADS_POSTAL_CODES['Reykhólahreppur'] - 1
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(false)
    })

    it('should allow Reykhólahreppur', async () => {
      const postalCode = ADS_POSTAL_CODES['Reykhólahreppur']
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(true)
    })

    it('should allow postalcodes between Reykhólahreppur and Þingeyri', async () => {
      const postalCode = postalCodeBetween(
        ADS_POSTAL_CODES['Reykhólahreppur'],
        ADS_POSTAL_CODES['Þingeyri'],
      )
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(true)
    })

    it('should allow Þingeyri', async () => {
      const postalCode = ADS_POSTAL_CODES['Þingeyri']
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(true)
    })

    it('should not allow right above Þingeyri', async () => {
      const postalCode = ADS_POSTAL_CODES['Þingeyri'] + 1
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(false)
    })

    it('should not allow right below Hólmavík', async () => {
      const postalCode = ADS_POSTAL_CODES['Hólmavík'] - 1
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(false)
    })

    it('should allow Hólmavík', async () => {
      const postalCode = ADS_POSTAL_CODES['Hólmavík']
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(true)
    })

    it('should allow postalcodes between Hólmavík and Öræfi', async () => {
      const postalCode = postalCodeBetween(
        ADS_POSTAL_CODES['Hólmavík'],
        ADS_POSTAL_CODES['Öræfi'],
      )
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(true)
    })

    it('should allow Öræfi', async () => {
      const postalCode = ADS_POSTAL_CODES['Öræfi']
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(true)
    })

    it('should not allow right above Öræfi', async () => {
      const postalCode = ADS_POSTAL_CODES['Öræfi'] + 1
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(false)
    })

    it('should allow Vestmannaeyjar', async () => {
      const postalCode = ADS_POSTAL_CODES['Vestmannaeyjar']
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(true)
    })

    it('Should not allow Hvammstangi', async () => {
      const postalCode = ADS_POSTAL_CODES['Hvammstangi']
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(false)
    })
    it('Should not allow Hvammstangi dreif', async () => {
      const postalCode = ADS_POSTAL_CODES['HvammstangiDreif']
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(false)
    })
    it('Should not allow Staður', async () => {
      const postalCode = ADS_POSTAL_CODES['Stadur']
      const result = flightService.isADSPostalCode(postalCode)
      expect(result).toBe(false)
    })
  })

  describe('countThisYearsFlightLegsByNationalId', () => {
    const nationalId = '1234567890'

    it('should return 2 unused flights for 2020', async () => {
      Date.now = () => 1577836800000 // 2020
      jest
        .spyOn(flightModel as any, 'count')
        .mockImplementation(() => Promise.resolve(0))

      const result = await flightService.countThisYearsFlightLegsByNationalId(
        nationalId,
      )

      expect(result).toEqual({
        used: 0,
        unused: 2,
        total: 2,
      })
    })

    it('should return 6 unused flights for other years', async () => {
      Date.now = () => 1640995200000 // 2022
      jest
        .spyOn(flightModel as any, 'count')
        .mockImplementation(() => Promise.resolve(0))

      const result = await flightService.countThisYearsFlightLegsByNationalId(
        nationalId,
      )

      expect(result).toEqual({
        used: 0,
        unused: 6,
        total: 6,
      })
    })

    it('should return correct usage based on booked flights', async () => {
      Date.now = () => 1640995200000 // 2022
      jest
        .spyOn(flightModel as any, 'count')
        .mockImplementation(() => Promise.resolve(4))

      const result = await flightService.countThisYearsFlightLegsByNationalId(
        nationalId,
      )

      expect(result).toEqual({
        used: 4,
        unused: 2,
        total: 6,
      })
    })
  })
})
