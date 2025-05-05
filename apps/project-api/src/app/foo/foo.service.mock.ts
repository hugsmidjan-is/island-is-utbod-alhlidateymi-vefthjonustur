import { GetFooResponse } from '../../services/foo-response.dto'
import { IFooService, Result } from '../../services/IFooService'

export class MockFooService implements IFooService {
  getFoo(id: string): Promise<Result<GetFooResponse>> {
    throw new Error('Method not implemented.')
  }
}
