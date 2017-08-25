var depth = param({
  type: 'number',
  value: 500,
  name: 'depth',
  identifier: 'depth'
})

object.add(depth)

function computedValue () {
  var result

  if (depth.get() < 450) {
    result = depth.get() * 2
    return result
  } else if (depth.get() < 500) {
    return 'b'
  } else if (depth.get() < 550) {
    return 'c'
  }
}

object.add(component({
  product: () => computedValue()
}))
