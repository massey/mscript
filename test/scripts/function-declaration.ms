param depth {
  type: 'number'
  value: 500
  name: 'depth'
}

function computedValue () {
  var result

  if (depth < 450) {
    result = depth * 2
    return result
  } else if (depth < 500) {
    return 'b'
  } else if (depth < 550) {
    return 'c'
  }
}

component {
  product: computedValue()
}
