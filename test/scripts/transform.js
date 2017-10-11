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

var height = param({
  type: 'number',
  value: 800,
  name: 'height',
  identifier: 'depth'
})
object.add(depth)

var base = component({
  A: () => width.get() + 100,
  B: () => depth.get(),
  transform: {
    translate: [{ y: 100 }]
  },
  name: 'base'
})
object.add(base)

var back = component({
  A: () => width.get() + 100,
  B: () => height.get() - 100,
  transform: {
    rotate: [{ x: 90 }]
    translate: [{ y: 100 + base.thickness, z: -depth.get() }]
  },
  name: 'back'
})
object.add(back)
