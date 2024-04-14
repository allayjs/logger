import { RuntimeException } from '@allayjs/exception'
import type { LoggerConfig, LoggerManagerConfig } from './types'

type DefineConfig = <Loggers extends Record<string, LoggerConfig>>(
  config: LoggerManagerConfig<Loggers>,
) => LoggerManagerConfig<Loggers>

const defineConfig: DefineConfig = (config) => {
  if (!config.loggers) {
    throw new RuntimeException('The "loggers" property is missing in logger config.')
  }

  if (!config.default) {
    throw new RuntimeException('The "default" logger is not specified in logger config.')
  }

  if (!config.loggers[config.default]) {
    throw new RuntimeException(`Default logger "${String(config.default)}" was not defined in "loggers".`)
  }

  const loggersKeys = Object.keys(config.loggers)

  for (const name of loggersKeys) {
    const logger = config.loggers[name]

    if (logger.transport && 'targets' in logger.transport) {
      for (const target of logger.transport.targets) {
        if (!target.level) {
          target.level = logger.level
        }
      }
    }
  }

  return config
}

export default defineConfig
