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
  identifier: 'height'
})
object.add(height)

var base = component({
  A: () => width.get() + 100,
  B: () => depth.get(),
  name: 'base',
  transform: {
    translate: [{ y: 100 }]
  }
})
object.add(base)

var back = component({
  A: () => width.get() + 100,
  B: () => height.get() - 100,
  name: 'back',
  transform: {
    rotate: [{ x: 90 }, { y: -90 }],
    translate: [{ y: () => 100 + base.thickness, z: () => -depth.get() }]
  }
})
object.add(back)
