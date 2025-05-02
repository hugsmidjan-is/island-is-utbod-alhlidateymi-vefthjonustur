import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

import { AdminPortalScope } from '@island.is/auth/scopes'
import {
  CurrentUser,
  IdsUserGuard,
  Scopes,
  ScopesGuard,
} from '@island.is/auth-nest-tools'
import type { User } from '@island.is/auth-nest-tools'
import type { FlightLeg as TFlightLeg } from '@island.is/clients/air-discount-scheme'

import { FlightLegsInput } from './dto/flight-leg.input'
import { ConfirmInvoiceInput } from './dto/confirm-invoice.input'
import { FlightLeg } from '../models/flightLeg.model'
import { FlightLegAdminService } from './flight-leg-admin.service'

@UseGuards(IdsUserGuard, ScopesGuard)
@Scopes(AdminPortalScope.airDiscountScheme)
@Resolver(() => FlightLeg)
export class FlightLegAdminResolver {
  constructor(private readonly flightLegAdminService: FlightLegAdminService) {}

  @Query(() => [FlightLeg], { name: 'airDiscountSchemeFlightLegs' })
  flightLegs(
    @CurrentUser() user: User,
    @Args('input', { type: () => FlightLegsInput }) input: FlightLegsInput,
  ): Promise<TFlightLeg[]> {
    return this.flightLegAdminService.flightLegs(user, input)
  }

  @Mutation(() => [FlightLeg], { name: 'confirmAirDiscountSchemeInvoice' })
  confirmInvoice(
    @CurrentUser() user: User,
    @Args('input', { type: () => ConfirmInvoiceInput })
    input: ConfirmInvoiceInput,
  ): Promise<TFlightLeg[]> {
    return this.flightLegAdminService.confirmInvoice(user, input)
  }

  @ResolveField('travel')
  resolveTravel(@Parent() flightLeg: TFlightLeg): string {
    return `${flightLeg.origin} - ${flightLeg.destination}`
  }
}
