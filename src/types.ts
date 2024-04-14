import type { DestinationStream, Level, LevelWithSilent, LoggerOptions } from 'pino'

export type LoggerTimestampKeywords = 'iso' | 'unix' | 'epoch'
export type TimestampFormatters = Record<LoggerTimestampKeywords, () => string>

export type LoggerLevel<Config extends LoggerConfig> = LevelWithSilent | keyof Config['customLevels']
export type LoggerTimestamp = LoggerTimestampKeywords | boolean | (() => string)
export interface LoggerConfig extends Omit<LoggerOptions<any>, 'browser' | 'timestamp'> {
  enabled?: true
  desination?: DestinationStream
  timestamp?: LoggerTimestamp
}

export interface FileTargetOptions {
  destination: string | number
  mkdir?: boolean
  append?: boolean
}

export type PrettyMessageFormat =
  | false
  | string
  | ((log: Record<string, unknown>, messageKey: string, levelLabel: string) => string)

export type PrettyDestination = string | number | DestinationStream | NodeJS.WritableStream

export type CustomPrettifiers = Record<string, (inputData: string | object) => string>

export interface PrettyTargetOptions {
  hideObject?: boolean
  translateTime?: boolean | string
  levelFirst?: boolean
  levelKey?: string
  levelLabel?: string
  messageKey?: string
  singleLine?: boolean
  timestampKey?: string
  minimumLevel?: Level
  messageFormat?: PrettyMessageFormat
  colorize?: boolean
  crlf?: boolean
  errorLikeObjectKeys?: string[]
  errorProps?: string
  ignore?: string
  include?: string
  sync?: boolean
  destination?: PrettyDestination
  append?: boolean
  mkdir?: boolean
  customPrettifiers?: CustomPrettifiers
}
export interface LoggerManagerConfig<Loggers extends Record<string, LoggerConfig>> {
  default: keyof Loggers
  loggers: Loggers
}

export type { Bindings, ChildLoggerOptions, Level, LevelMapping, TransportTargetOptions } from 'pino'
