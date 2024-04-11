import type { FileTargetOptions, Level, TransportTargetOptions } from '../types.js'

type File = (options?: FileTargetOptions, level?: string | Level) => TransportTargetOptions

const file: File = (options, level) => ({
  target: 'pino/file',
  level: level,
  options: options || {},
})

export default file
