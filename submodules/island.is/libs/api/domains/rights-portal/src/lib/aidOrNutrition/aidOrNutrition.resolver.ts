import { Query, Resolver } from '@nestjs/graphql'
import {
  IdsUserGuard,
  ScopesGuard,
  Scopes,
  CurrentUser,
} from '@island.is/auth-nest-tools'
import type { User } from '@island.is/auth-nest-tools'
import { UseGuards } from '@nestjs/common'
import { Audit } from '@island.is/nest/audit'
import { ApiScope } from '@island.is/auth/scopes'
import { PaginatedAidOrNutritionResponse } from './models/aidOrNutrition.model'
import { AidOrNutritionService } from './aidOrNutrition.service'

@Resolver()
@UseGuards(IdsUserGuard, ScopesGuard)
@Audit({ namespace: '@island.is/api/rights-portal/aid-and-nutrition' })
export class AidOrNutritionResolver {
  constructor(private readonly service: AidOrNutritionService) {}

  @Scopes(ApiScope.healthAssistiveAndNutrition)
  @Query(() => PaginatedAidOrNutritionResponse, {
    name: 'rightsPortalPaginatedAidOrNutrition',
    nullable: true,
  })
  @Audit()
  async getRightsPortalAidOrNutrition(@CurrentUser() user: User) {
    return this.service.getAidOrNutrition(user)
  }
}
