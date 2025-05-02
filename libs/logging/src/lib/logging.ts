import { utilities } from 'nest-winston'
import { createLogger, format, LoggerOptions, transports } from 'winston'

import { maskNationalIdFormatter } from './formatters'

// Default log settings for debug mode
let logLevel = 'debug'
let logFormat = format.combine(
  format.errors({ stack: true }),
  format.timestamp(),
  utilities.format.nestLike('App'),
  maskNationalIdFormatter(),
)

// Production overrides
if (process.env['NODE_ENV'] === 'production') {
  logLevel = process.env['LOG_LEVEL'] || 'info'
  logFormat = format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json(),
    maskNationalIdFormatter(),
  )
}

const logTransports = [new transports.Console()]

export const logger = createLogger({
  level: logLevel,
  format: logFormat,
  transports: logTransports,
  handleExceptions: true,
  exitOnError: true,
  exceptionHandlers: logTransports,
  rejectionHandlers: logTransports,
} as LoggerOptions)
