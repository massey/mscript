var width = param(object, {
  type: 'number',
  value: 1000,
  name: 'width'
})

var depth = param(object, {
  type: 'number',
  value: 600,
  name: 'depth'
})

var faceMaterial = param(object, {
  type: 'object',
  source: materials,
  name: 'faceMaterial'
})

var base = component(object, {
  A: () => width.get() + 100,
  B: () => depth.get(),
  material: '01.002',
  name: 'base'
})
