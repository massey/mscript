param width {
  type: 'number'
  value: 1000
}

component base {
  A: width + 100
  B: 500
  material: '01.002'
}

/*

The transpiled code should look like the following:

var width = param({
  name: 'width',
  type: 'number',
  value: 1000
})

var base = component({
  name: 'base',
  A: () => width.get() + 100,
  B: 500,
  material: '01.002'
})

*/
