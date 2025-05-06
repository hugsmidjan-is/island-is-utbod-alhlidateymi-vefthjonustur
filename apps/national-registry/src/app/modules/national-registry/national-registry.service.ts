import { LOGGER_PROVIDER } from '@hxm/logging'
import { Inject, NotFoundException } from '@nestjs/common'
import { Logger } from 'winston'
import { Result } from '../../../types/types'
import { INationalRegistryService } from './national-registry.types'
import { GetPersonResponse } from './dto/national-registry.response.dto'
import { NationalRegistryAddressModel } from './models/national-registry.address.model'
import { InjectModel } from '@nestjs/sequelize'
import { NationalRegistryPersonModel } from './models/national-registry.person.model'

export class NationalRegistryService implements INationalRegistryService {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
    @InjectModel(NationalRegistryPersonModel)
    private personModel: typeof NationalRegistryPersonModel,
  ) {}

  async getPerson(nationalId: string): Promise<Result<GetPersonResponse>> {
    this.logger.info('NationalRegistryService.getPerson', nationalId)

    let result
    try {
      result = await this.personModel.findOne({
        where: { nationalId },
        include: [NationalRegistryAddressModel],
      })
    } catch (e) {
      this.logger.error('error fetching person from database', {
        error: e,
      })
      return {
        ok: false,
        error: {
          code: 500,
          message: 'unexpected error',
        },
      }
    }

    if (!result) {
      throw new NotFoundException(`Person not found`)
    }

    const mapped: GetPersonResponse = {
      person: {
        name: result.name,
        email: result.email,
        phoneNumber: result.phonenumber,
        nationalId: result.nationalId,
        address: {
          address: result.address.address,
          postalCode: result.address.postalCode,
          city: result.address.city,
        },
      },
    }

    return {
      ok: true,
      value: mapped,
    }
  }
}
