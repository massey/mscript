var width = param({
  type: 'number',
  value: 1000,
  name: 'width',
  identifier: 'width'
})
object.add(width)

var depth = param({
  type: 'number',
  value: 600,
  name: 'depth',
  identifier: 'depth'
})
object.add(depth)

var faceMaterial = param({
  type: 'object',
  source: materials,
  name: 'faceMaterial',
  identifier: 'faceMaterial'
})
object.add(faceMaterial)

var base = component({
  A: () => width.get() + 100,
  B: () => depth.get(),
  material: '01.002',
  name: 'base'
})
object.add(base)
