const Node = require('../../dist/node.js').default

var node = Node.program()

/* param width */
function paramWidth () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('number')))
  properties.push(Node.property(Node.identifier('value'), Node.literal(1000)))
  properties.push(Node.property(Node.identifier('name'), Node.literal('width')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  let call = Node.callExpression('param', [parent, objectExpression])
  let id = Node.identifier('width')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

node.body.push(paramWidth())

module.exports = node
