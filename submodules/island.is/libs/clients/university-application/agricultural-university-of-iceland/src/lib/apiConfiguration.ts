import { createEnhancedFetch } from '@island.is/clients/middlewares'
import {
  ConfigType,
  IdsClientConfig,
  XRoadConfig,
} from '@island.is/nest/config'
import { Configuration, ProgramsApi } from '../../gen/fetch'
import { AgriculturalUniversityOfIcelandApplicationClientConfig } from './agriculturalUniversityOfIcelandClient.config'

const configFactory = (
  xRoadConfig: ConfigType<typeof XRoadConfig>,
  config: ConfigType<
    typeof AgriculturalUniversityOfIcelandApplicationClientConfig
  >,
  idsClientConfig: ConfigType<typeof IdsClientConfig>,
  basePath: string,
) => ({
  fetchApi: createEnhancedFetch({
    name: 'clients-university-application-agricultural-university-of-iceland',
    autoAuth: idsClientConfig.isConfigured
      ? {
          mode: 'auto',
          issuer: idsClientConfig.issuer,
          clientId: idsClientConfig.clientId,
          clientSecret: idsClientConfig.clientSecret,
          scope: config.scope,
        }
      : undefined,
  }),
  headers: {
    'X-Road-Client': xRoadConfig.xRoadClient,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  basePath,
})

export const exportedApis = [ProgramsApi].map((Api) => ({
  provide: Api,
  useFactory: (
    xRoadConfig: ConfigType<typeof XRoadConfig>,
    config: ConfigType<
      typeof AgriculturalUniversityOfIcelandApplicationClientConfig
    >,
    idsClientConfig: ConfigType<typeof IdsClientConfig>,
  ) => {
    return new Api(
      new Configuration(
        configFactory(
          xRoadConfig,
          config,
          idsClientConfig,
          `${xRoadConfig.xRoadBasePath}/r1/${config.xroadPath}`,
        ),
      ),
    )
  },
  inject: [
    XRoadConfig.KEY,
    AgriculturalUniversityOfIcelandApplicationClientConfig.KEY,
    IdsClientConfig.KEY,
  ],
}))
