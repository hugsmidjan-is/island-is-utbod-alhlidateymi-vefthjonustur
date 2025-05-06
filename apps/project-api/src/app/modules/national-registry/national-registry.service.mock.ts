import { NotFoundException } from '@nestjs/common'
import { Result } from '../../../types'
import { INationalRegistryService } from './national-registry.types'
import { GetPersonResponse, Person } from './dto/national-registry.dto'

const person: Person = {
  name: 'Jökull Þórðarson',
  nationalId: '1203894569',
  email: 'jokull.thordarson@email.is',
  phoneNumber: '7728391',
  address: {
    streetAddress: 'Bláfjallagata 12',
    postalCode: '105',
    city: 'Reykjavík',
  },
}

export class MockNationalRegistryService implements INationalRegistryService {
  async getPerson(nationalId: string): Promise<Result<GetPersonResponse>> {
    if (nationalId === '0000000000') {
      throw new Error('unexpected error')
    }

    if (nationalId !== person.nationalId) {
      throw new NotFoundException(`Person not found`)
    }

    const value: GetPersonResponse = {
      person,
    }

    return {
      ok: true,
      value,
    }
  }
}
