import { Query, Resolver } from '@nestjs/graphql'
import { ApiScope } from '@island.is/auth/scopes'
import { UseGuards } from '@nestjs/common'
import { Audit } from '@island.is/nest/audit'
import {
  IdsUserGuard,
  ScopesGuard,
  Scopes,
  CurrentUser,
} from '@island.is/auth-nest-tools'
import type { User } from '@island.is/auth-nest-tools'
import { TherapyService } from './therapy.service'
import { PaginatedTherapyResponse } from './models/therapy.model'

@Resolver()
@UseGuards(IdsUserGuard, ScopesGuard)
@Audit({ namespace: '@island.is/api/rights-portal/therapy' })
export class TherapyResolver {
  constructor(private readonly service: TherapyService) {}

  @Scopes(ApiScope.healthTherapies)
  @Query(() => PaginatedTherapyResponse, {
    name: 'rightsPortalPaginatedTherapies',
    nullable: true,
  })
  @Audit()
  async getRightsPortalTherapies(@CurrentUser() user: User) {
    const therapies = await this.service.getTherapies(user)

    return {
      data: therapies,
      totalCount: therapies?.length ?? 0,
      pageInfo: {
        hasNextPage: false, //until pagination is applied
      },
    }
  }
}
