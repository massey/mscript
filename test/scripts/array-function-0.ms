param number {
  type: 'number'
  value: 5
}

param width {
  type :'number'
  value: 500
}

param depth {
  type: 'number'
  value: 200
}

array {
  for (var i = 0; i < number; i++) {
    component front {
      A: width
      B: 18
    }

    component side {
      A: depth
      B: 18
    }
  }
}
