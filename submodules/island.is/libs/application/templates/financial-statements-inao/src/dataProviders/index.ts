import { defineTemplateApi } from '@island.is/application/types'
import { UserProfileApi } from '@island.is/application/types'

export {
  NationalRegistryUserApi,
  IdentityApi as IndentityApiProvider,
} from '@island.is/application/types'
export const CurrentUserTypeProvider = defineTemplateApi({
  action: 'getUserType',
  externalDataId: 'currentUserType',
})
export const UserInfoApi = UserProfileApi.configure({
  params: {
    catchMock: true,
  },
})
