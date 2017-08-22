var benchtopMaterial = param({
  type: 'object',
  source: $materials,
  name: 'benchtop material'
})
object.add(benchtopMaterial);

var benchtopHeight = param({
  type: 'number',
  value: 1000,
  max: 1000,
  name: 'benchtop height'
});
object.add(benchtopHeight)

var all = group({
  name: 'all',
  members: [benchtopMaterial, benchtopHeight]
})
object.add(all)
