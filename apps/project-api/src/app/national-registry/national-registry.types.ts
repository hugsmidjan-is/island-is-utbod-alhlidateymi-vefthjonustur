import { Result } from '../../types'
import { GetPersonResponse, Person } from './national-registry.dto'

export interface INationalRegistryService {
  // TODO nationalId should be from token
  // TODO nationaId in GET can leak PII
  getPerson(nationalId: string): Promise<Result<GetPersonResponse>>
}

export const INationalRegistryService = Symbol('INationalRegistryService')
