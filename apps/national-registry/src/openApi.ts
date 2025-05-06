import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('National Registry API')
  .setDescription('API for the project.')
  .setVersion('1.0')
  .build()
