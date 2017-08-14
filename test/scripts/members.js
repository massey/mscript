var width = param(object, {
  type: 'number',
  value: 1000,
  name: 'width'
})

var base = component(object, {
  A: () => width.get(),
  B: () => width.get()
})

var back = component(object, {
  A: () => base.A,
  B: () => base.B - base.thickness
})
