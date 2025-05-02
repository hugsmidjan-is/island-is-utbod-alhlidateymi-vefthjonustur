import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache as CacheManager } from 'cache-manager'
import { User } from './user.model'
import { Fund } from '@island.is/air-discount-scheme/types'
import { FlightService } from '../flight'
import {
  NationalRegistryService,
  NationalRegistryUser,
} from '../nationalRegistry'
import type { User as AuthUser } from '@island.is/auth-nest-tools'
import { info } from 'kennitala'
import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'

const ONE_WEEK = 604800 // seconds
const CACHE_KEY = 'userService'
const MAX_AGE_LIMIT = 18

const DEFAULT_FUND: Fund = {
  credit: 2,
  total: 2,
  used: 0,
}

interface CustodianCache {
  custodians: Array<NationalRegistryUser | null>
}

@Injectable()
export class UserService {
  constructor(
    private readonly flightService: FlightService,
    private readonly nationalRegistryService: NationalRegistryService,
    @Inject(LOGGER_PROVIDER)
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheManager,
  ) {}

  private getCacheKey(nationalId: string, suffix: 'custodians'): string {
    return `${CACHE_KEY}_${nationalId}_${suffix}`
  }

  async getRelations(authUser: AuthUser): Promise<Array<string>> {
    return this.nationalRegistryService.getRelations(authUser)
  }

  private async getFund(
    user: NationalRegistryUser,
    auth?: AuthUser,
    isManual?: boolean,
  ): Promise<Fund> {
    const { used, unused, total } =
      await this.flightService.countThisYearsFlightLegsByNationalId(
        user.nationalId,
      )
    let meetsADSRequirements = false

    if (this.flightService.isADSPostalCode(user.postalcode) || isManual) {
      meetsADSRequirements = true
    } else if (info(user.nationalId).age < MAX_AGE_LIMIT) {
      // NationalId is a minor and doesn't live in ADS postal codes.
      const cacheKey = this.getCacheKey(user.nationalId, 'custodians')
      const cacheValue = await this.cacheManager.get<CustodianCache>(cacheKey)
      let custodians = undefined

      if (cacheValue) {
        // We need cache incase we come here from publicApi without auth
        custodians = cacheValue.custodians
      } else if (auth) {
        // We have access to auth if a user is logged in
        custodians = [
          ...(await this.nationalRegistryService.getCustodians(
            auth,
            user.nationalId,
          )),
        ]
        await this.cacheManager.set(cacheKey, { custodians }, ONE_WEEK * 1000)
      }

      // Check child custodians if they have valid ADS postal code.
      if (custodians) {
        for (const custodian of custodians) {
          if (
            custodian &&
            this.flightService.isADSPostalCode(custodian.postalcode)
          ) {
            meetsADSRequirements = true
          }
        }
      }
    }

    return {
      credit: meetsADSRequirements ? unused : 0,
      used: used,
      total,
    }
  }

  private async getUserByNationalId<T>(
    nationalId: string,
    model: new (user: NationalRegistryUser, fund: Fund) => T,
    auth: AuthUser,
    isExplicit?: boolean,
    isManual?: boolean,
  ): Promise<T | null> {
    const user = await this.nationalRegistryService.getUser(nationalId, auth)
    if (!user) {
      return null
    }
    if (isExplicit) {
      return new model(user, DEFAULT_FUND)
    }
    const fund = await this.getFund(user, auth, isManual)
    return new model(user, fund)
  }

  async getUserInfoByNationalId(
    nationalId: string,
    auth: AuthUser,
    isExplicit?: boolean,
    isManual?: boolean,
  ): Promise<User | null> {
    return this.getUserByNationalId<User>(
      nationalId,
      User,
      auth,
      isExplicit,
      isManual,
    )
  }

  async getMultipleUsersByNationalIdArray(
    ids: string[],
    auth: AuthUser,
  ): Promise<Array<User>> {
    const allUsers = ids.map(async (nationalId) =>
      this.getUserInfoByNationalId(nationalId, auth),
    )

    const result = (await Promise.all(allUsers)).filter(Boolean) as Array<User>

    if (!result || result.length === 0) {
      this.logger.warn(
        'National Registry records for the user or their relatives could not be found.',
        {
          category: 'ads-backend',
        },
      )
      return []
    }

    return result
  }
}
