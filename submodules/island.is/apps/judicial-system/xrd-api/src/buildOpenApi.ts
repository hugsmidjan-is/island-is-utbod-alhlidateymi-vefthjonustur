import { buildOpenApi } from '@island.is/infra-nest-server'

import { AppModule } from './app/app.module'
import { openApi } from './openApi'

buildOpenApi({
  path: 'apps/judicial-system/xrd-api/src/openapi.yaml',
  appModule: AppModule,
  openApi,
})
