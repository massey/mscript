var all = group(object, {
  name: 'all'
})

var faceMaterial = param(all, {
  type: 'number',
  value: 600,
  name: 'faceMaterial'
})

var benchtopHeight = param(all, {
  type: 'number',
  value: 1000,
  name: 'benchtopHeight'
})

var benchtop = component(all, {
  name: 'benchtop',
  A: 23,
  B: 60,
  material: () => faceMaterial.get()
})
