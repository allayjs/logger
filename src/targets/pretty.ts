import type { Level, PrettyTargetOptions, TransportTargetOptions } from '../types'

export type Pretty = (options?: PrettyTargetOptions, level?: string | Level) => TransportTargetOptions

const pretty: Pretty = (options, level) => ({
  target: 'pino-pretty',
  level: level,
  options: options || {},
})

export default pretty
