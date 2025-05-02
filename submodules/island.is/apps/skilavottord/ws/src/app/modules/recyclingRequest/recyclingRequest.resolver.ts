import { Inject, NotFoundException, forwardRef } from '@nestjs/common'
import { Query, Resolver, Args, Mutation, Int } from '@nestjs/graphql'

import { Authorize, Role, CurrentUser, User } from '../auth'
import { VehicleModel } from '../vehicle'
import {
  RecyclingRequestModel,
  RecyclingRequestTypes,
  RecyclingRequestResponse,
} from './recyclingRequest.model'
import { RecyclingRequestService } from './recyclingRequest.service'
import { SamgongustofaService } from '../samgongustofa'

@Authorize()
@Resolver(() => RecyclingRequestModel)
export class RecyclingRequestResolver {
  constructor(
    private recyclingRequestService: RecyclingRequestService,
    @Inject(forwardRef(() => SamgongustofaService))
    private samgongustofaService: SamgongustofaService,
  ) {}

  @Authorize({ roles: [Role.developer, Role.recyclingFund] })
  @Query(() => [RecyclingRequestModel])
  async skilavottordAllRecyclingRequests(): Promise<RecyclingRequestModel[]> {
    const recyclingRequests = await this.recyclingRequestService.findAll()
    return recyclingRequests
  }

  @Query(() => [RecyclingRequestModel])
  async skilavottordUserRecyclingRequest(
    @CurrentUser() user: User,
    @Args('permno') perm: string,
  ): Promise<RecyclingRequestModel[]> {
    const vehicle = await this.samgongustofaService.getUserVehicle(
      user.nationalId,
      perm,
      false,
    )
    if (!vehicle) {
      throw new NotFoundException(
        `Car with license plate ${perm} was not found for this user`,
      )
    }

    const userLastRecyclingRequest =
      await this.recyclingRequestService.findUserRecyclingRequestWithPermno(
        vehicle,
      )
    return userLastRecyclingRequest
  }

  @Authorize({
    roles: [
      Role.developer,
      Role.recyclingCompany,
      Role.recyclingFund,
      Role.recyclingCompanyAdmin,
    ],
  })
  @Query(() => [RecyclingRequestModel])
  async skilavottordRecyclingRequests(
    @Args('permno') perm: string,
  ): Promise<RecyclingRequestModel[]> {
    const recyclingRequests =
      await this.recyclingRequestService.findAllWithPermno(perm)
    return recyclingRequests
  }

  @Authorize({
    roles: [Role.developer, Role.recyclingCompany, Role.recyclingCompanyAdmin],
  })
  @Query(() => Boolean)
  async skilavottordDeRegisterVehicle(
    @Args('vehiclePermno') permno: string,
    @Args('recyclingPartner') station: string,
    @Args('mileage', { type: () => Int, nullable: true }) mileage: number,
  ): Promise<boolean> {
    //this.recyclingRequestService.deRegisterVehicle(permno, station, 0)
    throw new Error('Not used anymore')
  }

  @Authorize({
    roles: [Role.developer, Role.recyclingCompany, Role.recyclingCompanyAdmin],
  })
  @Query(() => VehicleModel)
  async skilavottordVehicleReadyToDeregistered(
    @CurrentUser() user: User,
    @Args('permno') permno: string,
  ): Promise<VehicleModel> {
    return this.recyclingRequestService.getVehicleInfoToDeregistered(
      user,
      permno,
    )
  }

  @Mutation(() => RecyclingRequestResponse)
  async createSkilavottordRecyclingRequest(
    @CurrentUser() user: User,
    @Args({ name: 'requestType', type: () => RecyclingRequestTypes })
    requestType: RecyclingRequestTypes,
    @Args('permno') permno: string,
  ): Promise<typeof RecyclingRequestResponse> {
    if (requestType === 'pendingRecycle' || requestType === 'cancelled') {
      const vehicle = await this.samgongustofaService.getUserVehicle(
        user.nationalId,
        permno,
      )
      // Check if user owns the vehicle
      if (!vehicle) {
        throw new NotFoundException(
          `User doesn't have right to deregistered the vehicle`,
        )
      }
    }
    const hasPermission = [
      Role.developer,
      Role.recyclingCompany,
      Role.recyclingCompanyAdmin,
    ].includes(user.role)
    if (requestType === 'deregistered' && !hasPermission) {
      throw new NotFoundException(
        `car-recycling: User doesn't have right to deregistered the vehicle`,
      )
    }

    return this.recyclingRequestService.createRecyclingRequest(
      user,
      requestType,
      permno,
    )
  }
}
