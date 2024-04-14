import type { LevelWithSilent, Logger as PinoLogger } from 'pino'
import type { Bindings, ChildLoggerOptions, LevelMapping, LoggerConfig } from './types'

// @ts-expect-error "abstract-logging does not have types"
import abstractLogging from 'abstract-logging'
import createPino, { levels } from './pino'

type LoggerLevel<Config extends LoggerConfig> = LevelWithSilent | keyof Config['customLevels']

export default class Logger<Config extends LoggerConfig = LoggerConfig> {
  pino: PinoLogger<keyof Config['customLevels'] & string>

  constructor(
    protected config: Config,
    pino?: PinoLogger<keyof Config['customLevels'] & string>,
  ) {
    this.pino = !this.config.enabled ? abstractLogging : pino || createPino(this.config)
  }

  public get isEnabled() {
    return this.config.enabled
  }

  public get levels(): LevelMapping {
    if (!this.isEnabled) {
      return levels
    }

    return this.pino.levels
  }

  public get level(): string {
    if (!this.isEnabled) {
      return this.config.level || 'info'
    }

    return this.pino.level
  }

  set level(level: string) {
    if (!this.isEnabled) {
      this.config.level = level
      return
    }

    this.pino.level = level
  }

  public log(level: LoggerLevel<Config>, message: string, ...values: any[]): void
  public log(level: LoggerLevel<Config>, object: any, message: string, ...values: any[]): void
  public log(level: LoggerLevel<Config>, object: any, message: string, ...values: any[]): void {
    if (!this.isEnabled) {
      return
    }
    ;(this.pino[level] as any)(object, message, ...values)
  }

  public trace<T extends object>(object: T, message?: string, ...values: any[]): void
  public trace(object: unknown, message?: string, ...values: any[]): void
  public trace(message: string, ...values: any[]): void
  public trace(object: any, message: string, ...values: any[]): void {
    this.log('trace', object, message, ...values)
  }

  public debug<T extends object>(object: T, message?: string, ...values: any[]): void
  public debug(object: unknown, message?: string, ...values: any[]): void
  public debug(message: string, ...values: any[]): void
  public debug(object: any, message: string, ...values: any[]): void {
    this.log('debug', object, message, ...values)
  }

  public info<T extends object>(object: T, message?: string, ...values: any[]): void
  public info(object: unknown, message?: string, ...values: any[]): void
  public info(message: string, ...values: any[]): void
  public info(object: any, message: string, ...values: any[]): void {
    this.log('info', object, message, ...values)
  }

  public warn<T extends object>(object: T, message?: string, ...values: any[]): void
  public warn(object: unknown, message?: string, ...values: any[]): void
  public warn(message: string, ...values: any[]): void
  public warn(object: any, message: string, ...values: any[]): void {
    this.log('warn', object, message, ...values)
  }

  public error<T extends object>(object: T, message?: string, ...values: any[]): void
  public error(object: unknown, message?: string, ...values: any[]): void
  public error(message: string, ...values: any[]): void
  public error(object: any, message: string, ...values: any[]): void {
    this.log('error', object, message, ...values)
  }

  public fatal<T extends object>(object: T, message?: string, ...values: any[]): void
  public fatal(object: unknown, message?: string, ...values: any[]): void
  public fatal(message: string, ...values: any[]): void
  public fatal(object: any, message: string, ...values: any[]): void {
    this.log('fatal', object, message, ...values)
  }

  public silent<T extends object>(object: T, message?: string, ...values: any[]): void
  public silent(object: unknown, message?: string, ...values: any[]): void
  public silent(message: string, ...values: any[]): void
  public silent(object: any, message: string, ...values: any[]): void {
    this.log('silent', object, message, ...values)
  }

  public child<ChildOptions extends ChildLoggerOptions>(
    bindings: Bindings,
    options?: ChildOptions,
  ): Logger<Config> {
    if (!this.isEnabled) {
      return this
    }

    return new Logger(this.config, this.pino.child(bindings, options))
  }

  public bindings(): Bindings {
    if (!this.isEnabled) {
      return {}
    }

    return this.pino.bindings()
  }
}
