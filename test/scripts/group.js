var benchtopMaterial = param({
  type: 'object',
  source: $materials,
  name: 'benchtop material',
  identifier: 'benchtopMaterial'
})
object.add(benchtopMaterial);

var benchtopHeight = param({
  type: 'number',
  value: 1000,
  max: 1000,
  name: 'benchtop height',
  identifier: 'benchtopHeight'
});
object.add(benchtopHeight)

var all = group({
  name: 'all',
  members: [benchtopMaterial, benchtopHeight]
})
object.add(all);

(function () {
  var group_1 = group({
    name: 'test'
  })
  object.add(group_1);

  group_1.add(param({
    name: 'testParam',
    type: 'number',
    value: 1000
  }))
})()
