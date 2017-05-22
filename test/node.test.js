const Node = require('../dist/node.js').default

test('make a CallExpression', () => {
  let a  = Node.identifier('test')
  let ce = Node.callExpression('test', [a])

  expect(ce instanceof Node).toBe(true)
  expect(ce.callee instanceof Node).toBe(true)
  expect(ce.callee.type).toBe('Identifier')
  expect(ce.callee.name).toBe('test')
  expect(ce.arguments.length).toBe(1)
})

test('make an Identifier', () => {
  let i = Node.identifier('test')

  expect(i instanceof Node).toBe(true)
  expect(i.name).toBe('test')
})

test('make a Literal', () => {
  let l = Node.literal(1)

  expect(l instanceof Node).toBe(true)
  expect(l.value).toBe(1)
  expect(l.raw).toBe('1')
})

test('make an ObjectExpression', () => {
  let i = Node.identifier('test')
  let prop = Node.property('test', i)
  let oe = Node.objectExpression([prop])

  expect(oe instanceof Node).toBe(true)
  expect(oe.type).toBe('ObjectExpression')
  expect(oe.properties.length).toBe(1)
})

test('make a Program', () => {
  let p = Node.program()

  expect(p instanceof Node).toBe(true)
  expect(p.body instanceof Array).toBe(true)
  expect(p.body.length).toBe(0)
})

test('make a Property', () => {
  let v = Node.identifier('test')
  let p = Node.property('test', v)


  expect(p instanceof Node).toBe(true)
  expect(p.type).toBe('Property')
  expect(p.key.name).toBe('test')
  expect(p.value instanceof Node).toBe(true)
  expect(p.value.type).toBe('Identifier')
  expect(p.value.name).toBe('test')
})

test('make a VariableDeclaration', () => {
  let vd = Node.variableDeclaration()

  expect(vd.type).toBe('VariableDeclaration')
  expect(vd instanceof Node).toBe(true)
  expect(vd.declarations instanceof Array).toBe(true)
  expect(vd.declarations.length).toBe(0)
})

test('make a VariableDeclarator', () => {
  let init = Node.identifier('test')
  let vd   = Node.variableDeclarator('test', init)

  expect(vd instanceof Node).toBe(true)
  expect(vd.id instanceof Node).toBe(true)
  expect(vd.id.name).toBe('test')
  expect(vd.init instanceof Node).toBe(true)
})
