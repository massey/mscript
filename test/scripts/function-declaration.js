var depth = param({
  type: 'number',
  value: 500,
  name: 'depth'
})

object.add(depth)

function computedValue () {
  if (depth.get() < 450) {
    return 'a'
  } else if (depth.get() < 500) {
    return 'b'
  } else if (depth.get() < 550) {
    return 'c'
  }
}
