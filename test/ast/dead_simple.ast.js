const Node = require('../../dist/node.js').default

var node = Node.program()

/* param width */
function paramWidth () {
  let properties = []

  /* options keys */
  let type = Node.identifier('type')
  let value = Node.identifier('value')
  let name = Node.identifier('name')
  /* options values */
  let typeValue = Node.literal('number')
  let valueValue = Node.literal(1000)
  let nameValue = Node.literal('width')

  properties.push(Node.property(type, typeValue))
  properties.push(Node.property(value, valueValue))
  properties.push(Node.property(name, nameValue))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  let call = Node.callExpression('param', [parent, objectExpression])
  let id = Node.identifier('param')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

node.body.push(paramWidth())

module.exports = node
