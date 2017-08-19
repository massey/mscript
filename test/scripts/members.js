var width = param({
  type: 'number',
  value: 1000,
  name: 'width'
})
object.add(width)

var base = component({
  A: () => width.get(),
  B: () => width.get(),
  name: 'base'
})
object.add(base)

var back = component({
  A: () => base.A,
  B: () => base.B - base.thickness,
  name: 'back'
})
object.add(back)
