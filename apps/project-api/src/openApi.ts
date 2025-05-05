import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('Project API')
  .setDescription('API for the project.')
  .setVersion('1.0')
  .build()
