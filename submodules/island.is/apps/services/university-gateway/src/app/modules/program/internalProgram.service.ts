import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Program } from './model/program'
import { ProgramModeOfDelivery } from './model/programModeOfDelivery'
import { ProgramExtraApplicationField } from './model/programExtraApplicationField'
import { University } from '../university/model/university'
import { ReykjavikUniversityApplicationClient } from '@island.is/clients/university-application/reykjavik-university'
import { UniversityOfIcelandApplicationClient } from '@island.is/clients/university-application/university-of-iceland'
import { UniversityOfAkureyriApplicationClient } from '@island.is/clients/university-application/university-of-akureyri'
import { BifrostUniversityApplicationClient } from '@island.is/clients/university-application/bifrost-university'
import { IcelandUniversityOfTheArtsApplicationClient } from '@island.is/clients/university-application/iceland-university-of-the-arts'
import { AgriculturalUniversityOfIcelandApplicationClient } from '@island.is/clients/university-application/agricultural-university-of-iceland'
import { HolarUniversityApplicationClient } from '@island.is/clients/university-application/holar-university'
import { IProgram, UniversityNationalIds } from '@island.is/university-gateway'
import { logger } from '@island.is/logging'

@Injectable()
export class InternalProgramService {
  constructor(
    private readonly reykjavikUniversityClient: ReykjavikUniversityApplicationClient,
    private readonly universityOfIcelandClient: UniversityOfIcelandApplicationClient,
    private readonly universityOfAkureyriClient: UniversityOfAkureyriApplicationClient,
    private readonly bifrostUniversityClient: BifrostUniversityApplicationClient,
    private readonly icelandUniversityOfTheArtsClient: IcelandUniversityOfTheArtsApplicationClient,
    private readonly agriculturalUniversityOfIcelandClient: AgriculturalUniversityOfIcelandApplicationClient,
    private readonly holarUniversityClient: HolarUniversityApplicationClient,

    @InjectModel(University)
    private universityModel: typeof University,

    @InjectModel(Program)
    private programModel: typeof Program,

    @InjectModel(ProgramModeOfDelivery)
    private programModeOfDeliveryModel: typeof ProgramModeOfDelivery,

    @InjectModel(ProgramExtraApplicationField)
    private programExtraApplicationFieldModel: typeof ProgramExtraApplicationField,
  ) {}

  async updatePrograms(): Promise<void> {
    Promise.allSettled([
      await this.doUpdateProgramsForUniversity(
        UniversityNationalIds.REYKJAVIK_UNIVERSITY,
        () => this.reykjavikUniversityClient.getPrograms(),
      ),
      await this.doUpdateProgramsForUniversity(
        UniversityNationalIds.UNIVERSITY_OF_ICELAND,
        () => this.universityOfIcelandClient.getPrograms(),
      ),
      await this.doUpdateProgramsForUniversity(
        UniversityNationalIds.UNIVERSITY_OF_AKUREYRI,
        () => this.universityOfAkureyriClient.getPrograms(),
      ),
      await this.doUpdateProgramsForUniversity(
        UniversityNationalIds.BIFROST_UNIVERSITY,
        () => this.bifrostUniversityClient.getPrograms(),
      ),
      await this.doUpdateProgramsForUniversity(
        UniversityNationalIds.ICELAND_UNIVERSITY_OF_THE_ARTS,
        () => this.icelandUniversityOfTheArtsClient.getPrograms(),
      ),
      await this.doUpdateProgramsForUniversity(
        UniversityNationalIds.AGRICULTURAL_UNIVERSITY_OF_ICELAND,
        () => this.agriculturalUniversityOfIcelandClient.getPrograms(),
      ),
      await this.doUpdateProgramsForUniversity(
        UniversityNationalIds.HOLAR_UNIVERSITY,
        () => this.holarUniversityClient.getPrograms(),
      ),
    ]).catch((e) => {
      logger.error('Failed to update programs, reason:', e)
    })
  }

  private async doUpdateProgramsForUniversity(
    universityNationalId: string,
    getPrograms: () => Promise<IProgram[]>,
  ): Promise<void> {
    const universityId = (
      await this.universityModel.findOne({
        attributes: ['id'],
        where: { nationalId: universityNationalId },
      })
    )?.id

    if (!universityId) {
      throw new Error(
        `University with national id ${universityNationalId} not found in DB`,
      )
    }

    logger.info(
      `Started updating programs for university ${universityNationalId}`,
    )

    let programList: IProgram[] = []

    // In case of some error with the fetch we wrap it in try/catch and log the error
    try {
      programList = await getPrograms()

      // 1. Mark all programs as "temporarily inactive", so we know in the end which programs
      // should actually be inactive (hidden)
      // This is done to make sure not all programs for the university are marked as
      // inactive (hidden) while we are updating the list of programs
      await this.programModel.update(
        {
          tmpActive: false,
        },
        {
          where: { universityId },
        },
      )

      // 2. CREATE/UPDATE all programs for this university (mark them as "temporarily active" again)
      for (let i = 0; i < programList.length; i++) {
        await this.doUpdateProgramForUniversity(programList[i], universityId)
      }

      // 3. UPDATE all programs for this university which are still marked as "temporarily inactive" and make them inactive
      await this.programModel.update(
        {
          active: false,
        },
        {
          where: { universityId, tmpActive: false },
        },
      )
    } catch (e) {
      logger.error(
        `Failed to update programs for university ${universityNationalId}, reason:`,
        e,
      )
    }

    logger.info(
      `Finished updating programs for university ${universityNationalId}`,
    )
  }

  private async doUpdateProgramForUniversity(
    program: IProgram,
    universityId: string,
  ): Promise<void> {
    const specializationList = program.specializations || []

    // Added Math.max to make sure we enter the loop at least once (once for programs with no specialization)
    const specializationListLength = Math.max(specializationList.length, 1)

    for (let j = 0; j < specializationListLength; j++) {
      const specialization = specializationList[j]

      try {
        // Map to programModel object
        const programObj = {
          ...program,
          active: true,
          tmpActive: true,
          specializationExternalId: specialization?.externalId,
          specializationNameIs: specialization?.nameIs,
          specializationNameEn: specialization?.nameEn,
          universityId,
          modeOfDelivery: [],
          extraApplicationFields: [],
        }

        const modeOfDeliveryList = program.modeOfDelivery || []
        const extraApplicationFieldList = program.extraApplicationFields || []

        const programWhere: {
          externalId: string
          specializationExternalId?: string
          universityId: string
        } = {
          externalId: programObj.externalId,
          universityId: programObj.universityId,
        }

        if (specialization?.externalId) {
          programWhere.specializationExternalId = specialization.externalId
        }

        // 1. UPSERT program (make sure tmpActive becomes true)
        const oldProgramObj = await this.programModel.findOne({
          attributes: ['id'],
          where: programWhere,
        })
        const [{ id: programId }] = await this.programModel.upsert({
          ...programObj,
          id: oldProgramObj?.id,
        })

        // 2a. DELETE program mode of delivery
        await this.programModeOfDeliveryModel.destroy({
          where: { programId: programId },
        })

        // 2b. CREATE program mode of delivery
        for (let k = 0; k < modeOfDeliveryList.length; k++) {
          await this.programModeOfDeliveryModel.create({
            programId: programId,
            modeOfDelivery: modeOfDeliveryList[k],
          })
        }

        // 3a. DELETE program extra application field
        await this.programExtraApplicationFieldModel.destroy({
          where: { programId: programId },
        })

        // 3b. CREATE program extra application field
        for (let k = 0; k < extraApplicationFieldList.length; k++) {
          await this.programExtraApplicationFieldModel.create({
            programId: programId,
            externalKey: extraApplicationFieldList[k].externalKey,
            nameIs: extraApplicationFieldList[k].nameIs,
            nameEn: extraApplicationFieldList[k].nameEn,
            descriptionIs: extraApplicationFieldList[k].descriptionIs,
            descriptionEn: extraApplicationFieldList[k].descriptionEn,
            required: extraApplicationFieldList[k].required,
            fieldType: extraApplicationFieldList[k].fieldType,
            uploadAcceptedFileType:
              extraApplicationFieldList[k].uploadAcceptedFileType,
            options: extraApplicationFieldList[k].options,
          })
        }
      } catch (e) {
        logger.error(
          `Failed to update program with externalId ${program.externalId} and specializationExternalId ${specializationList[j]?.externalId}, reason:`,
          e,
        )
      }
    }
  }
}
