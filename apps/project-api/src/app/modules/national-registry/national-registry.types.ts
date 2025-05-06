import { Result } from '../../../types/types'
import { GetPersonResponse } from './dto/national-registry.response.dto'

export interface INationalRegistryService {
  getPerson(nationalId: string): Promise<Result<GetPersonResponse>>
}

export const INationalRegistryService = Symbol('INationalRegistryService')
