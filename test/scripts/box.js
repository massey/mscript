var width = param(object, {
  type: 'number',
  value: 500,
  name: 'width'
})

var depth = param(object, {
  type: 'number',
  value: 600,
  name: 'depth'
})

var height = param(object, {
  type: 'number',
  value: 700,
  name: 'height'
})

var carcas = box({
  a: () => width.get(),
  b: () => depth.get(),
  c: () => height.get()
})
