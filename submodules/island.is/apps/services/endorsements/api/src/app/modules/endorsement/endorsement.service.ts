import {
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Endorsement } from './models/endorsement.model'
import type { Logger } from '@island.is/logging'
import { LOGGER_PROVIDER } from '@island.is/logging'
import { EndorsementList } from '../endorsementList/endorsementList.model'
import { Op, UniqueConstraintError } from 'sequelize'
import { EndorsementTag } from '../endorsementList/constants'
import { paginate } from '@island.is/nest/pagination'
import { ENDORSEMENT_SYSTEM_GENERAL_PETITION_TAGS } from '../../../environments/environment'
import { NationalRegistryV3ClientService } from '@island.is/clients/national-registry-v3'

interface FindEndorsementInput {
  listId: string
  nationalId: string
}

interface EndorsementInput {
  endorsementList: EndorsementList
  nationalId: string
  showName: boolean
}

interface DeleteEndorsementInput {
  endorsementList: EndorsementList
  nationalId: string
}
interface FindEndorsementsInput {
  listId: string
}

interface FindUserEndorsementsByTagsInput {
  nationalId: string
  tags: EndorsementTag[]
}

export interface NationalIdError {
  nationalId: string
  message: string
}

@Injectable()
export class EndorsementService {
  constructor(
    @InjectModel(EndorsementList)
    private readonly endorsementListModel: typeof EndorsementList,
    @InjectModel(Endorsement)
    private endorsementModel: typeof Endorsement,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
    private readonly nationalRegistryApiV3: NationalRegistryV3ClientService,
  ) {}

  async updateEndorsementCountOnList(listId: string): Promise<void> {
    try {
      const count = await this.endorsementModel.count({
        where: { endorsementListId: listId },
      })
      const [affectedRows, updatedList] =
        await this.endorsementListModel.update(
          { endorsementCount: count },
          {
            where: { id: listId },
            returning: true,
          },
        )
      if (affectedRows > 0 && updatedList[0].endorsementCount === count) {
        this.logger.info(
          `Successfully updated endorsement count for list "${listId}" to ${count}`,
        )
      } else {
        this.logger.error(
          `Failed to update endorsement count for list "${listId}". The count was not updated correctly.`,
        )
      }
    } catch (error) {
      this.logger.error(
        `Error updating endorsement count for list "${listId}": ${error.message}`,
      )
      throw error
    }
  }

  async findEndorsements({ listId }: FindEndorsementsInput, query: any) {
    this.logger.info(`Finding endorsements by list id "${listId}"`)

    return await paginate({
      Model: this.endorsementModel,
      limit: query.limit || 10,
      after: query.after,
      before: query.before,
      primaryKeyField: 'counter',
      orderOption: [['counter', 'DESC']],
      where: { endorsementListId: listId },
    })
  }

  async findEndorsementsGeneralPetition(
    { listId }: FindEndorsementsInput,
    query: any,
  ) {
    this.logger.info(
      `Finding GeneralPetitionendorsements by list id "${listId}"`,
    )
    // check if list exists and belongs to general petitions
    const result = await this.endorsementListModel.findOne({
      where: {
        id: listId,
        tags: { [Op.eq]: ENDORSEMENT_SYSTEM_GENERAL_PETITION_TAGS },
      },
    })
    if (!result) {
      throw new NotFoundException(['Not found - not a General Petition List'])
    }
    return this.findEndorsements({ listId }, query)
  }

  async findSingleUserEndorsement({
    nationalId,
    listId,
  }: FindEndorsementInput) {
    this.logger.info(
      `Finding endorsement in list "${listId}" by nationalId "${nationalId}"`,
    )

    const result = await this.endorsementModel.findOne({
      where: { endorser: nationalId, endorsementListId: listId },
    })

    if (!result) {
      return { hasEndorsed: false }
    }

    return { hasEndorsed: true }
  }

  async createEndorsementOnList({
    endorsementList,
    nationalId,
    showName,
  }: EndorsementInput) {
    this.logger.info(`Creating resource with nationalId - ${nationalId}`)

    // we don't allow endorsements on closed lists
    if (new Date() >= endorsementList.closedDate) {
      throw new MethodNotAllowedException(['Unable to endorse closed list'])
    }
    const person = await this.nationalRegistryApiV3.getAllDataIndividual(
      nationalId,
    )
    const endorsement = {
      endorser: nationalId,
      endorsementListId: endorsementList.id,
      meta: {
        fullName: person?.fulltNafn?.fulltNafn,
        locality: person?.heimilisfang?.sveitarfelag,
        showName,
      },
    }

    try {
      const createdEndorsement = await this.endorsementModel.create(endorsement)
      await this.updateEndorsementCountOnList(endorsementList.id)
      return createdEndorsement
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        this.logger.warn('Endorsement already exists in list')
        throw new MethodNotAllowedException([
          'Endorsement already exists in list',
        ])
      } else {
        throw error
      }
    }
  }

  async deleteFromListByNationalId({
    nationalId,
    endorsementList,
  }: DeleteEndorsementInput) {
    this.logger.info(
      `Removing endorsement from list "${endorsementList.id}" by nationalId "${nationalId}"`,
    )

    // we don't allow endorsements on closed lists
    if (new Date() >= endorsementList.closedDate) {
      this.logger.warn('Unable to remove endorsement form closed list')
      throw new MethodNotAllowedException([
        'Unable to remove endorsement form closed list',
      ])
    }

    const results = await this.endorsementModel.destroy({
      where: {
        endorser: nationalId,
        endorsementListId: endorsementList.id,
      },
    })

    if (results === 0) {
      this.logger.warn(
        'Failed to remove endorsement from list, endorsement does not exist',
        { listId: endorsementList.id },
      )
      throw new NotFoundException(["This endorsement doesn't exist"])
    }
    await this.updateEndorsementCountOnList(endorsementList.id)
  }
}
