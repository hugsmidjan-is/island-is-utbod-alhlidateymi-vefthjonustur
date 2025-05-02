import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

import { ApiScope } from '@island.is/auth/scopes'
import type { User } from '@island.is/auth-nest-tools'
import {
  CurrentUser,
  IdsUserGuard,
  Scopes,
  ScopesGuard,
} from '@island.is/auth-nest-tools'

import { FinancialStatementsInaoService } from './financialStatementsInao.service'
import { Election } from './models/election.model'
import { ClientType } from './models/clientType.model'
import { InaoClientFinancialLimitInput } from './dto/clientFinancialLimit.input'
import { Config } from './models/config.model'
import { TaxInfo } from './models/taxInfo.model'

@UseGuards(IdsUserGuard, ScopesGuard)
@Scopes(ApiScope.internal, ApiScope.internalProcuring)
@Resolver()
export class FinancialStatementsInaoResolver {
  constructor(
    private financialStatementsService: FinancialStatementsInaoService,
  ) {}

  @Query(() => [ClientType], { nullable: true })
  async financialStatementsInaoClientTypes() {
    return this.financialStatementsService.getClientTypes()
  }

  @Query(() => ClientType, { nullable: true })
  async financialStatementsInaoCurrentUserClientType(
    @CurrentUser() user: User,
  ): Promise<ClientType | null> {
    return this.financialStatementsService.getUserClientType(user.nationalId)
  }

  @Query(() => [Election], { nullable: true })
  async financialStatementsInaoElections(@CurrentUser() user: User) {
    return this.financialStatementsService.getElections(user.nationalId)
  }

  @Query(() => Number, { nullable: true })
  async financialStatementsInaoClientFinancialLimit(
    @Args('input') input: InaoClientFinancialLimitInput,
  ) {
    return this.financialStatementsService.getClientFinancialLimit(
      input.clientType,
      input.year,
    )
  }

  @Query(() => [Config])
  async financialStatementsInaoConfig() {
    return this.financialStatementsService.getConfig()
  }

  @Query(() => [TaxInfo])
  async financialStatementsInaoTaxInfo(
    @CurrentUser() user: User,
    @Args('year') year: string,
  ) {
    return this.financialStatementsService.getTaxInformation(
      user.nationalId,
      year,
    )
  }
}
