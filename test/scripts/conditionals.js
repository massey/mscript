var width = param(object, {
  type: 'number',
  value: 1000,
  name: 'width'
})

var depth = param (object, {
  type: 'number',
  value: 600,
  name: 'depth'
})

var base = component(object, {
  A: () => width.get() ? 50 : depth.get()
})
