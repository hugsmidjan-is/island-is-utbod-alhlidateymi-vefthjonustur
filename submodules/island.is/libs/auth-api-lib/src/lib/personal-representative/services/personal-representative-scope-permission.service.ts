import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { PersonalRepresentativeScopePermission } from '../models/personal-representative-scope-permission.model'
import { PersonalRepresentativeScopePermissionDTO } from '../dto/personal-representative-scope-permission.dto'
import { PersonalRepresentativeRightType } from '../models/personal-representative-right-type.model'

@Injectable()
export class PersonalRepresentativeScopePermissionService {
  constructor(
    @InjectModel(PersonalRepresentativeScopePermission)
    private prScopePermissionModel: typeof PersonalRepresentativeScopePermission,
  ) {}

  async getScopePermissionsAsync(
    apiScopeName: string,
  ): Promise<PersonalRepresentativeScopePermission[]> {
    return this.prScopePermissionModel.findAll({
      where: { apiScopeName },
      include: [
        {
          model: PersonalRepresentativeRightType,
          required: true,
        },
      ],
    })
  }

  async createScopePermissionAsync(
    scopePermission: PersonalRepresentativeScopePermissionDTO,
  ): Promise<PersonalRepresentativeScopePermission> {
    return await this.prScopePermissionModel.create({
      rightTypeCode: scopePermission.permission,
      apiScopeName: scopePermission.apiScopeName,
    })
  }

  async deleteScopePermissionAsync(id: string): Promise<void> {
    const item = await this.prScopePermissionModel.findOne({
      where: { id },
    })
    await item?.destroy()
  }
}
