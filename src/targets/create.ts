import type { TransportTargetOptions } from '../types.js'

export default class Targets {
  private collection: TransportTargetOptions[] = []

  public push(value: TransportTargetOptions): this {
    this.collection.push(value)
    return this
  }

  public pushIf(conditional: boolean, value: TransportTargetOptions | (() => TransportTargetOptions)) {
    if (conditional) {
      this.collection.push(typeof value === 'function' ? value() : value)
    }

    return this
  }

  public pushUnless(conditional: boolean, value: TransportTargetOptions | (() => TransportTargetOptions)) {
    if (!conditional) {
      this.collection.push(typeof value === 'function' ? value() : value)
    }

    return this
  }

  public toArray(): TransportTargetOptions[] {
    return this.collection
  }
}
