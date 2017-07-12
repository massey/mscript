const Node = require('../../dist/node.js').default

function variable (id, init, ref) {
  id = Node.identifier(id)

  if (ref) Object.defineProperty(id, 'referenceType', { value: ref })

  return Node.variableDeclaration(
    'var',
    [Node.variableDeclarator(
      id,
      Node.literal(init)
    )]
  )
}

module.exports = [
  variable('baz', 'bar'),
  variable('radius', 'param', 'param')
]
