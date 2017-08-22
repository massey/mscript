param number {
  type: 'number'
  value: 5
  name: 'number'
}

param width {
  type: 'number'
  value: 500
  name: 'width'
}

array {
  for (var i = 0; i < number; i++) {
    component drawer {
      name: 'drawer'

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
}
