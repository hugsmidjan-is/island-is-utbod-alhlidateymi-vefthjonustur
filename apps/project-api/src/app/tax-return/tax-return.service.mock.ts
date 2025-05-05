import { LOGGER_PROVIDER } from '@hxm/logging'
import { Inject, NotFoundException } from '@nestjs/common'
import { Logger } from 'winston'
import { Result } from '../../types'
import {
  GetPersonPrefillResponse,
  IncomeEmployment,
  ITaxReturnService,
  PersonPrefill,
} from './tax-return.types'

const incomeEmployment: IncomeEmployment = {
  number: '2.1',
  label: {
    en: 'Wages and employment-related payments',
    is: 'Launatekjur og starfstengdar greiðslur',
  },
  items: [
    {
      id: '1',
      label: 'Norðurljós Software ehf',
      amount: {
        amount: 9360000,
        currency: 'ISK',
      },
    },
    {
      id: '2',
      label: 'Mús & Merki ehf.',
      amount: {
        amount: 960000,
        currency: 'ISK',
      },
    },
  ],
}

const personPrefill: PersonPrefill = {
  nationalId: '1203894569',
  incomeEmployment,
}

export class MockTaxReturnService implements ITaxReturnService {
  constructor(@Inject(LOGGER_PROVIDER) private readonly logger: Logger) {}
  getPersonPrefill(
    nationalId: string,
  ): Promise<Result<GetPersonPrefillResponse>> {
    this.logger.info('MockTaxReturnService.getPersonPrefill', nationalId)

    if (nationalId !== personPrefill.nationalId) {
      throw new NotFoundException(`Person not found`)
    }

    const response: Result<GetPersonPrefillResponse> = {
      ok: true,
      value: { prefill: personPrefill },
    }

    return Promise.resolve(response)
  }
}
