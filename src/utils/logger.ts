import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const consoleFormat = format.printf((info): string => {
  const { level, message, timestamp, stack, ...meta } = info

  let extras = ''

  if (Object.keys(meta).length > 0) {
    extras = '\n' + JSON.stringify(meta, null, 2)
  }

  return `${timestamp} [${level}]: ${stack || message}${extras}`
})

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true })
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/loan-service-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: format.json(),
    }),

    new transports.Console({
      format: format.combine(format.colorize(), consoleFormat),
      level: 'debug',
    }),
  ],
})

export default logger

export function handleRoutineError(routineName: string, error: Error): void {
  logger.error({
    message: `Error in routine: ${routineName}`,
    routineName,
    error: error.message,
    stack: error.stack,
  })

  // TODO: Integrate with any alerting/monitoring system here.
}
