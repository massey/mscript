const Node = require('../../dist/node.js').default

var node = Node.program()

function componentBase () {
  let properties = []

  let A = Node.memberExpression(Node.identifier('base'), Node.identifier('A'))
  let B = Node.binaryExpression(
    Node.memberExpression(Node.identifier('base'), Node.identifier('B')),
    '-',
    Node.memberExpression(Node.identifier('base'), Node.identifier('thickness'))
  )

  properties.push(Node.property(Node.identifier('A'), A))
  properties.push(Node.property(Node.identifier('B'), B))
  properties.push(Node.property(Node.identifier('name'), Node.literal('back')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  let call = Node.callExpression(Node.identifier('component'), [parent, objectExpression])
  let id = Node.identifier('back')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

node.body.push(componentBase())

module.exports = node
