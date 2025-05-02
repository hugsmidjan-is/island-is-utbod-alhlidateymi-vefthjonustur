import { serviceSetup as jsApiSetup } from '../../../apps/judicial-system/api/infra/judicial-system-api'
import { serviceSetup as jsBackendSetup } from '../../../apps/judicial-system/backend/infra/judicial-system-backend'
import { serviceSetup as jsWebSetup } from '../../../apps/judicial-system/web/infra/judicial-system-web'
import { serviceSetup as jsXrdApiSetup } from '../../../apps/judicial-system/xrd-api/infra/judicial-system-xrd-api'
import { serviceSetup as jsSchedulerSetup } from '../../../apps/judicial-system/scheduler/infra/judicial-system-scheduler'
import { serviceSetup as jsMessageHandlerSetup } from '../../../apps/judicial-system/message-handler/infra/judicial-system-message-handler'
import { serviceSetup as jsDigitalInboxRobotApiSetup } from '../../../apps/judicial-system/digital-mailbox-api/infra/judicial-system-xrd-robot-api'

import { EnvironmentServices } from '.././dsl/types/charts'

const jsBack = jsBackendSetup()
const jsApi = jsApiSetup({ backend: jsBack })
const jsWeb = jsWebSetup({ api: jsApi })
const jsXrdApi = jsXrdApiSetup({ backend: jsBack })
const jsScheduler = jsSchedulerSetup({ backend: jsBack })
const jsMessageHandler = jsMessageHandlerSetup({ backend: jsBack })
const jsDigitalInboxRobotApi = jsDigitalInboxRobotApiSetup({ backend: jsBack })

export const Services: EnvironmentServices = {
  prod: [
    jsApi,
    jsBack,
    jsWeb,
    jsXrdApi,
    jsScheduler,
    jsMessageHandler,
    jsDigitalInboxRobotApi,
  ],
  staging: [
    jsApi,
    jsBack,
    jsWeb,
    jsXrdApi,
    jsScheduler,
    jsMessageHandler,
    jsDigitalInboxRobotApi,
  ],
  dev: [
    jsApi,
    jsBack,
    jsWeb,
    jsXrdApi,
    jsScheduler,
    jsMessageHandler,
    jsDigitalInboxRobotApi,
  ],
}
