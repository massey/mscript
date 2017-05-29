const Node = require('../../dist/node.js').default

var node = Node.program()

/* param width */
function globals () {
  let properties = []

  properties.push(Node.property(Node.identifier('radius'), Node.literal(1.5)))
  properties.push(Node.property(Node.identifier('trigger'), Node.literal('i')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  let call = Node.callExpression('globals', [parent, objectExpression])

  return Node.expressionStatement(call)
}

node.body.push(globals())

module.exports = node
