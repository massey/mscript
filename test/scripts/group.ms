param benchtopMaterial {
  type: 'object'
  source: $materials
  name: 'benchtop material'
}

param benchtopHeight {
  type: 'number'
  value: 1000
  max: 1000
  name: 'benchtop height'
}

group all {
  name: 'all'
  members: [benchtopMaterial, benchtopHeight]
}

group {
  name: 'test'

  param {
    name: 'testParam'
    type: 'number'
    value: 1000
  }
}
