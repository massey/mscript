param depth {
  type: 'number'
  value: 500
  name: 'depth'
}

function computedValue () {
  if (depth < 450) {
    return 'a'
  } else if (depth < 500) {
    return 'b'
  } else if (depth < 550) {
    return 'c'
  }
}
