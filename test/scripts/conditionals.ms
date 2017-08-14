param width {
  type: 'number'
  value: 1000
}

param depth {
  type: 'number'
  value: 600
}

component base {
  A: width ? 50 : depth
}
