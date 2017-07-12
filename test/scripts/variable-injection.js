var baz = 'bar'
var radius = 'param'
var foo = component(object, {
  A: () => radius.get() + 40,
  name: 'foo'
})
