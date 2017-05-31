param width {
  type: 'number'
  value: 1000
}

param depth {
  type: 'number'
  value: 600
}

param faceMaterial {
  type: 'object'
  source: materials
}

component base {
  A: width + 100
  B: depth
  material: '01.002'
}
