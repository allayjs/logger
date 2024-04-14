import type { LoggerOptions, Logger as PinoLogger } from 'pino'
import type { LoggerConfig, TimestampFormatters } from './types'

import { destination, multistream, pino, stdSerializers, stdTimeFunctions, transport, version } from 'pino'

const TIMESTAMP_FORMATTERS: TimestampFormatters = {
  iso: stdTimeFunctions.isoTime,
  epoch: stdTimeFunctions.epochTime,
  unix: stdTimeFunctions.unixTime,
}

export type CreatePinoReturn<Options extends LoggerConfig> = PinoLogger<keyof Options['customLevels'] & string>
export type CreatePino = <Options extends LoggerConfig>(options: Options) => CreatePinoReturn<Options>

const createPino: CreatePino = (options) => {
  const { desination, timestamp, ...rest } = options
  const pinoOptions: LoggerOptions<any> = Object.assign({}, rest)

  if (typeof timestamp === 'string' && TIMESTAMP_FORMATTERS[timestamp]) {
    pinoOptions.timestamp = TIMESTAMP_FORMATTERS[timestamp]
  }

  return desination ? pino(pinoOptions, desination) : pino(pinoOptions)
}

export const levels = {
  labels: {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal',
  },
  values: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10,
  },
}

export default createPino
export { destination, transport, stdSerializers, multistream, stdTimeFunctions, version }
