const Node = require('../../dist/node.js').default

var node = Node.program()

/* param width */
function globals () {
  let elements = []

  elements.push(
    Node.objectExpression([
      Node.property(Node.identifier('name'), Node.literal('radius')),
      Node.property(Node.identifier('value'), Node.literal(1.5)),
      Node.property(Node.identifier('visibility'), Node.literal('private'))
    ])
  )

  elements.push(
    Node.objectExpression([
      Node.property(Node.identifier('name'), Node.literal('trigger')),
      Node.property(Node.identifier('value'), Node.literal('i'))
    ])
  )

  let attributes = Node.arrayExpression(elements)
  let parent = Node.identifier('object')
  let call = Node.callExpression('attributes', [parent, attributes])

  return Node.expressionStatement(call)
}

node.body.push(globals())

module.exports = node
