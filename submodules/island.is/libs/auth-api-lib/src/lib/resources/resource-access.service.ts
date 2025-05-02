import { NoContentException } from '@island.is/nest/problem'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { Op } from 'sequelize'
import { ApiScopeUser } from './models/api-scope-user.model'
import { ApiScopeUserAccess } from './models/api-scope-user-access.model'
import { ApiScopeUserDTO } from './dto/api-scope-user.dto'
import { ApiScopeUserUpdateDTO } from './dto/api-scope-user-update.dto'
import { ApiScopeUserAccessDTO } from './dto/api-scope-user-access.dto'

@Injectable()
export class ResourceAccessService {
  constructor(
    @InjectModel(ApiScopeUser)
    private apiScopeUser: typeof ApiScopeUser,
    @InjectModel(ApiScopeUserAccess)
    private apiScopeUserAccess: typeof ApiScopeUserAccess,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  /** Gets the Api Scope User with the nationalId */
  async findOne(nationalId: string): Promise<ApiScopeUser | null> {
    this.logger.debug(`Finding Api Scope User for nationalId - "${nationalId}"`)

    const apiScopeUser = await this.apiScopeUser.findByPk(nationalId, {
      include: [ApiScopeUserAccess],
    })

    return apiScopeUser
  }

  /** Finds all Api Scope User Access Scopes */
  async findAll(
    nationalId: string,
    requestedScopes: string[],
  ): Promise<ApiScopeUserAccess[] | null> {
    this.logger.debug(`Finding access for nationalId - "${nationalId}"`)

    return await this.apiScopeUserAccess.findAll({
      where: {
        [Op.and]: [
          { nationalId: nationalId },
          { scope: { [Op.in]: requestedScopes } },
        ],
      },
    })
  }

  /** Gets all Api Scope Users with paging */
  async findAndCountAll(
    searchString: string,
    page: number,
    count: number,
  ): Promise<{ rows: ApiScopeUser[]; count: number }> {
    this.logger.debug(
      `Getting Api Scope Users list with page "${page}" and count "${count} with searchString "${searchString}""`,
    )

    page--
    const offset = page * count
    if (searchString) {
      return this.apiScopeUser.findAndCountAll({
        limit: count,
        offset: offset,
        distinct: true,
        where: {
          [Op.or]: ['nationalId', 'name', 'email'].map((key) => ({
            [key]: {
              [Op.iLike]: `%${searchString.toLowerCase()}%`,
            },
          })),
        },
        order: ['nationalId'],
      })
    } else {
      return this.apiScopeUser.findAndCountAll({
        limit: count,
        offset: offset,
        distinct: true,
        order: ['nationalId'],
      })
    }
  }

  /** Creates a new Api Scope User */
  async create({
    userAccess,
    ...apiScopeUser
  }: ApiScopeUserDTO): Promise<ApiScopeUser> {
    this.logger.debug('Creating a new admin')

    const newApiScopeUser = await this.apiScopeUser.create(apiScopeUser)

    if (newApiScopeUser) {
      const apiScopeResponse = await this.createUserScopes(userAccess)

      if (apiScopeResponse) {
        return newApiScopeUser
      } else {
        throw new Error('Error inserting scopes')
      }
    }

    return newApiScopeUser
  }

  /** Updates an existing Api Scope User */
  async update(
    { userAccess, ...apiScopeUserData }: ApiScopeUserUpdateDTO,
    nationalId: string,
  ): Promise<ApiScopeUser> {
    this.logger.debug('Updating Api Scope User with nationalId: ', nationalId)

    if (!nationalId) {
      throw new BadRequestException('nationalId must be provided')
    }

    const apiScopeUser = await this.apiScopeUser.findByPk(nationalId, {
      include: [ApiScopeUserAccess],
    })
    if (!apiScopeUser) {
      throw new NoContentException()
    }

    await apiScopeUser.update({ ...apiScopeUserData })

    await this.deleteUserScopes(nationalId)
    await this.createUserScopes(userAccess)

    return (await this.findOne(nationalId)) as ApiScopeUser
  }

  /** Deleting an Api Scope User by nationalId */
  async delete(nationalId: string): Promise<number> {
    this.logger.debug(
      'Deleting an Api Scope User with nationalId: ',
      nationalId,
    )

    if (!nationalId) {
      throw new BadRequestException('nationalId must be provided')
    }

    await this.deleteUserScopes(nationalId)

    return await this.apiScopeUser.destroy({
      where: {
        nationalId: nationalId,
      },
    })
  }

  /** Deleting user scopes by nationalId */
  async deleteUserScopes(nationalId: string): Promise<number> {
    this.logger.debug(
      'Deleting an Api Scopes for User with nationalId: ',
      nationalId,
    )

    if (!nationalId) {
      throw new BadRequestException('nationalId must be provided')
    }

    const response = await this.apiScopeUserAccess.destroy({
      where: {
        nationalId: nationalId,
      },
    })

    return response
  }

  /** Creates User Scopes of Api Scope User */
  async createUserScopes(
    scopes: ApiScopeUserAccessDTO[] | undefined,
  ): Promise<ApiScopeUserAccess[] | null> {
    if (!scopes) return null

    this.logger.debug('Insert scopes for Api Scope User: ', scopes)

    return Promise.all(
      scopes.map((scope) => this.apiScopeUserAccess.create({ ...scope })),
    )
  }
}
