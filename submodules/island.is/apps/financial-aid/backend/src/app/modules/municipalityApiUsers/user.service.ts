import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import CryptoJS from 'crypto-js'
import { ApiUserModel } from './models/user.model'
import { Op } from 'sequelize'
import { CreateApiKeyDto } from './dto'
import { environment } from '../../../environments'
import { uuid } from 'uuidv4'
import { DeleteApiKeyResponse } from './models/deleteFile.response'

@Injectable()
export class ApiUserService {
  constructor(
    @InjectModel(ApiUserModel)
    private readonly apiUserModel: typeof ApiUserModel,
  ) {}

  async findByMunicipalityCodeAndApiKey(
    apiKey: string,
    municipalityCode: string,
  ): Promise<ApiUserModel> {
    const keysWithMunicipalityCode = await this.apiUserModel.findAll({
      where: {
        municipalityCode,
      },
    })

    if (keysWithMunicipalityCode.length === 0) {
      throw new BadRequestException('Municipality-Code is invalid')
    }

    const findKeysWithMunicipalityCode = keysWithMunicipalityCode.find(
      (m) => this.decryptApiKey(m).apiKey === apiKey,
    )

    if (!findKeysWithMunicipalityCode) {
      throw new UnauthorizedException('API-Key is invalid')
    }
    return findKeysWithMunicipalityCode
  }

  async findByMunicipalityCode(
    municipalityCodes: string[],
  ): Promise<ApiUserModel[]> {
    return (
      await this.apiUserModel.findAll({
        where: {
          municipalityCode: {
            [Op.in]: municipalityCodes,
          },
        },
      })
    ).map((m) => this.decryptApiKey(m))
  }

  async create(input: CreateApiKeyDto): Promise<ApiUserModel> {
    const cryptedApiKey = CryptoJS.AES.encrypt(
      input.apiKey,
      environment.municipalityAccessApiEncryptionKey,
      { iv: CryptoJS.enc.Hex.parse(uuid()) },
    ).toString()

    const apiUserModel = await this.apiUserModel.create({
      ...input,
      apiKey: cryptedApiKey,
    })

    return this.decryptApiKey(apiUserModel)
  }

  async delete(id: string): Promise<DeleteApiKeyResponse> {
    const promisedUpdate = this.apiUserModel.destroy({
      where: {
        id,
      },
    })

    const numberOfAffectedRows = await promisedUpdate

    if (numberOfAffectedRows !== 1) {
      throw new NotFoundException(`Api key ${id} does not exist`)
    }

    return { success: numberOfAffectedRows === 1 }
  }

  async updateApiKey(id: string, name: string): Promise<ApiUserModel> {
    const [numberOfAffectedRows, [updatedApiKey]] =
      await this.apiUserModel.update(
        { name },
        {
          where: { id },
          returning: true,
        },
      )

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Api key ${id} does not exist`)
    }

    return this.decryptApiKey(updatedApiKey)
  }

  decryptApiKey(apiKeyInfo?: ApiUserModel) {
    if (apiKeyInfo?.apiKey) {
      apiKeyInfo.apiKey = CryptoJS.AES.decrypt(
        apiKeyInfo.apiKey,
        environment.municipalityAccessApiEncryptionKey,
      ).toString(CryptoJS.enc.Utf8)
    }
    return apiKeyInfo
  }
}
