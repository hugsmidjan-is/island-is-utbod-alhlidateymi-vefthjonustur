import { defineConfig } from '@island.is/nest/config'
import { z } from 'zod'

const schema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  tokenUrl: z.string(),
  basePath: z.string(),
})

export const DocumentClientConfig = defineConfig<z.infer<typeof schema>>({
  name: 'DocumentsClient',
  schema,
  load: (env) => ({
    clientId: env.required(
      'POSTHOLF_CLIENTID',
      '9c615e34-0a82-45ab-aede-899f1d312564',
    ),
    clientSecret: env.required('POSTHOLF_CLIENT_SECRET', ''),
    tokenUrl: env.required(
      'POSTHOLF_TOKEN_URL',
      'https://login.microsoftonline.com/056f32fd-08bc-4818-9271-af7a0dbd8474/oauth2/v2.0/token',
    ),
    basePath: env.required(
      'POSTHOLF_BASE_PATH',
      'https://test-skjalabirting-island-is.azurewebsites.net',
    ),
  }),
})
