/**
When a component option references another components' properties, the option
should become an arrow function.
*/

const Node = require('../../dist/node.js').default

var node = Node.program()

function paramWidth () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('number')))
  properties.push(Node.property(Node.identifier('value'), Node.literal(1000)))
  properties.push(Node.property(Node.identifier('name'), Node.literal('width')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('object')
  let call = Node.callExpression('param', [object, objectExpression])
  let id = Node.identifier('width')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

function componentBase () {
  let properties = []

  let A = Node.arrowFunctionExpression([],
    Node.callExpression(
      Node.memberExpression(
        Node.identifier('width'),
        Node.identifier('get')
      )
    )
  )
  let B = Node.arrowFunctionExpression([],
    Node.callExpression(
      Node.memberExpression(
        Node.identifier('width'),
        Node.identifier('get')
      )
    )
  )

  properties.push(Node.property(Node.identifier('A'), A))
  properties.push(Node.property(Node.identifier('B'), B))
  properties.push(Node.property(Node.identifier('name'), Node.literal('base')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('object')
  let call = Node.callExpression(Node.identifier('component'), [object, objectExpression])
  let id = Node.identifier('base')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

function componentBack () {
  let properties = []

  let A = Node.arrowFunctionExpression(
    [],
    Node.memberExpression(
      Node.identifier('base'),
      Node.identifier('A')
    )
  )
  let B = Node.arrowFunctionExpression(
    [],
    Node.binaryExpression(
      Node.memberExpression(
        Node.identifier('base'),
        Node.identifier('B')
      ),
      '-',
      Node.memberExpression(
        Node.identifier('base'),
        Node.identifier('thickness')
      )
    )
  )

  properties.push(Node.property(Node.identifier('A'), A))
  properties.push(Node.property(Node.identifier('B'), B))
  properties.push(Node.property(Node.identifier('name'), Node.literal('back')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('object')
  let call = Node.callExpression(Node.identifier('component'), [object, objectExpression])
  let id = Node.identifier('back')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

node.body.push(paramWidth())
node.body.push(componentBase())
node.body.push(componentBack())

module.exports = node
