import { bootstrap, processJob } from '@island.is/infra-nest-server'
import { AppModule } from './app/app.module'
import { openApi } from './openApi'
import { NotificationsWorkerService } from './app/modules/notifications/notificationsWorker/notificationsWorker.service'

const job = processJob()

if (job === 'cleanup') {
  import('./cleanup').then((app) => app.cleanup())
} else {
  bootstrap({
    appModule: AppModule,
    name: 'services-user-notifications',
    openApi,
    enableVersioning: true,
    healthCheck: {
      database: true,
    },
  }).then(async ({ app }) => {
    if (job === 'worker') {
      const notificationsWorkerService = await app.resolve(
        NotificationsWorkerService,
      )
      await notificationsWorkerService.run()
    }
  })
}
