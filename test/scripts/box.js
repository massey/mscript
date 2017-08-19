var width = param({
  type: 'number',
  value: 500,
  name: 'width'
})
object.add(width)

var depth = param({
  type: 'number',
  value: 600,
  name: 'depth'
})
object.add(depth)

var height = param({
  type: 'number',
  value: 700,
  name: 'height'
})
object.add(height)

var carcas = box({
  a: () => width.get(),
  b: () => depth.get(),
  c: () => height.get()
})
