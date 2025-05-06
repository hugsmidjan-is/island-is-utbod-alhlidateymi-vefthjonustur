import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('Digitial Iceland 2025 tender API project')
  .setDescription(
    'Single API for all the projects in Digital Iceland 2025 tender.',
  )
  .setVersion('1.0')
  .build()
