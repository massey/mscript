const Node = require('../../dist/node.js').default

var node = Node.program()

/* param width */
function paramWidth () {
  let properties = []

  let A = Node.arrowFunctionExpression(
    [],
    Node.binaryExpression(
      Node.identifier('height'),
      '+',
      Node.conditionalExpression(
        Node.identifier('width'),
        Node.literal(50),
        Node.identifier('depth')
      )
    )
  )

  properties.push(Node.property(Node.identifier('A'), A))
  properties.push(Node.property(Node.identifier('name'), Node.literal('base')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  let call = Node.callExpression('param', [parent, objectExpression])
  let id = Node.identifier('param')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

node.body.push(paramWidth())

module.exports = node
