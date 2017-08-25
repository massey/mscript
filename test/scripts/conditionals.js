var width = param({
  type: 'number',
  value: 1000,
  identifier: 'width'
})
object.add(width)

var depth = param ({
  type: 'number',
  value: 600,
  identifier: 'depth'
})
object.add(depth)

var base = component({
  A: () => width.get() ? 50 : depth.get()
})
object.add(base)
