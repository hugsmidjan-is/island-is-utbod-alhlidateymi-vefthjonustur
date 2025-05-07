import { DocumentBuilder } from '@nestjs/swagger'

export const openApi = new DocumentBuilder()
  .setTitle('National Registry API')
  .setDescription(
    'National Registry API for the Digital Iceland 2025 tender example.',
  )
  .setVersion('1.0')
  .build()
