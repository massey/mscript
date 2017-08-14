param width {
  type: 'number'
  value: 1000
}

component base {
  A: width
  B: width
}

component back {
  A: base.A
  B: base.B - base.thickness
}
