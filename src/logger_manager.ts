import type { Logger as PinoLogger } from 'pino'
import type { LoggerConfig, LoggerManagerConfig } from './types'

import Logger from './logger'

export default class LoggerManager<Loggers extends Record<string, LoggerConfig>> extends Logger<LoggerConfig> {
  private options: LoggerManagerConfig<Loggers>
  private loggers: Map<keyof Loggers, Logger<Loggers[keyof Loggers]>> = new Map()

  constructor(config: LoggerManagerConfig<Loggers>) {
    super(config.loggers[config.default])
    this.options = config
  }

  protected createLogger<K extends keyof Loggers>(logger: K, config: Loggers[K]): Logger<Loggers[K]> {
    if (!config.name && typeof logger === 'string') {
      config.name = logger
    }

    return new Logger(config)
  }

  public create<Config extends LoggerConfig>(
    config: Config,
    pino?: PinoLogger<keyof Config['customLevels'] & string>,
  ) {
    return new Logger(config, pino)
  }

  public use<K extends keyof Loggers>(logger: K): Logger<Loggers[K]>
  public use(): Logger<LoggerConfig>
  public use<K extends keyof Loggers>(logger?: K): Logger<Loggers[K]> | Logger<LoggerConfig> {
    const loggerToUse = logger || this.options.default

    if (this.loggers.has(loggerToUse)) {
      return this.loggers.get(loggerToUse) as Logger<Loggers[K]> | Logger<LoggerConfig>
    }

    const config = this.options.loggers[loggerToUse]
    const loggerInstance = this.createLogger(loggerToUse, config)

    this.loggers.set(loggerToUse, loggerInstance)

    return loggerInstance as Logger<Loggers[K]> | Logger<LoggerConfig>
  }
}
