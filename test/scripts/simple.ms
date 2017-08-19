param width {
  type: 'number'
  value: 1000
  name: 'width'
}

param depth {
  type: 'number'
  value: 600
  name: 'depth'
}

param faceMaterial {
  type: 'object'
  source: materials
  name: 'faceMaterial'
}

component base {
  A: width + 100
  B: depth
  material: '01.002'
  name: 'base'
}
