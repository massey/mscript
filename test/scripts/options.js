// This ouptput is affected by data provided when the original mscript was
// transpiled.  See the options object in the test.

var radius = object.parent.params[0]

var width = param({
  type: 'number',
  value: 200,
  name: 'width'
})

var msg = param({
  type: 'string',
  value: 'bye',
  name: 'msg'
})

var base = component(object, {
  A: () => width.get() - radius.get()
})
