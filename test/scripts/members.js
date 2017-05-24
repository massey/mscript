param width {
  type: 'number'
  value: 1000
}

param depth {
  type: 'number'
  value: 600
}

param height {
  type: 'number'
  value: 1000
}

param kickHeight {
  type: 'number'
  value: 100
}

component base {
  A: width + 100
  B: depth
  material: '01.002'
}

component back {
  A: base.A
  B: base.B - base.thickness
  material: '01.002'
}
