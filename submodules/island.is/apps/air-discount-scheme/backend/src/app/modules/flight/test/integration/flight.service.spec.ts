import { INestApplication } from '@nestjs/common'

import { Airlines } from '@island.is/air-discount-scheme/consts'

import { NationalRegistryUser } from '../../../nationalRegistry'
import { FlightService } from '../../flight.service'
import { CreateFlightBody } from '../../dto'
import { setup } from '../../../../../../test/setup'

let app: INestApplication
let flightService: FlightService

beforeAll(async () => {
  app = await setup()
  flightService = app.get<FlightService>(FlightService)
})

describe('create', () => {
  const flightDto: CreateFlightBody = {
    bookingDate: new Date('2020-08-17T12:35:50.971Z'),
    flightLegs: [
      {
        origin: 'VPN',
        destination: 'AEY',
        originalPrice: 50000,
        discountPrice: 30000,
        date: new Date('2021-03-12T12:35:50.971Z'),
      },
      {
        origin: 'VPN',
        destination: 'AEY',
        originalPrice: 50000,
        discountPrice: 30000,
        date: new Date('2021-03-12T12:35:50.971Z'),
        cooperation: Airlines.norlandair,
      },
    ],
  }
  const user: NationalRegistryUser = {
    nationalId: 'string',
    firstName: 'string',
    middleName: 'string',
    lastName: 'string',
    gender: 'kk',
    address: 'string',
    postalcode: 200,
    city: 'string',
  }

  it('should set the cooperation as norlandair when it is included in body', async () => {
    const airline = 'icelandair'
    const result = await flightService.create(flightDto, user, airline, false)
    const flightLegs = result.flightLegs ?? []

    expect(flightLegs.length).toEqual(2)
    expect(flightLegs[0].airline).toEqual(airline)
    expect(flightLegs[1].airline).toEqual(airline)
    expect(flightLegs[0].cooperation).toEqual(null)
    expect(flightLegs[1].cooperation).toEqual(Airlines.norlandair)
  })
})
