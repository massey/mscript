var width = param({
  type: 'number',
  value: 500,
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

var height = param({
  type: 'number',
  value: 700,
  name: 'height',
  identifier: 'height'
})
object.add(height)

var carcas = box({
  a: () => width.get(),
  b: () => depth.get(),
  c: () => height.get()
})
