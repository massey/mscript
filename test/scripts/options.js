param width {
  type: 'number'
  value: 100
}

param depth {
  type: 'string'
  value: 'hi'
}

param height {
  type: 'object'
  accessor: 'foo'
}

// radius is a param on the parent's parent
component base {
  A: width - radius
}
