param width {
  type: 'number'
  value: 1000
  name: 'width'
}

component base {
  A: width
  B: width
  name: 'base'
}

component back {
  A: base.A
  B: base.B - base.thickness
  name: 'back'
}

width.split().forEach()
