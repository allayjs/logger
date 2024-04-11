import Create from './create'
import file from './file'
import pretty from './pretty'

type Targets = () => Create

const targets: Targets = () => new Create()

Object.assign(targets, {
  file,
  pretty,
})

export default targets
