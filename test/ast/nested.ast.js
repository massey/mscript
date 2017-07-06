const Node = require('../../dist/node.js').default
const caller = require('./ast_helpers.js').caller

var node = Node.program()

function groupAll () {
  let properties = []

  properties.push(Node.property(Node.identifier('name'), Node.literal('all')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('object')
  return caller('all', 'group', [object, objectExpression])
}

function paramFaceMaterial () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('number')))
  properties.push(Node.property(Node.identifier('value'), Node.literal(600)))
  properties.push(Node.property(Node.identifier('name'), Node.literal('faceMaterial')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('all')
  return caller('faceMaterial', 'param', [object, objectExpression])
}

function paramBenchtopHeight () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('number')))
  properties.push(Node.property(Node.identifier('value'), Node.literal(1000)))
  properties.push(Node.property(Node.identifier('name'), Node.literal('benchtopHeight')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('all')
  return caller('benchtopHeight', 'param', [object, objectExpression])
}

function componentBenchtop () {
  let properties = []

  properties.push(Node.property(Node.identifier('A'), Node.literal(23)))
  properties.push(Node.property(Node.identifier('B'), Node.literal(60)))

  let name = Node.arrowFunctionExpression(
    [],
    Node.callExpression(
      Node.memberExpression(
        Node.identifier('faceMaterial'),
        Node.identifier('get')
      )
    )
  )

  properties.push(Node.property(Node.identifier('material'), name))
  properties.push(Node.property(Node.identifier('name'), Node.literal('benchtop')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('all')
  return caller('benchtop', 'component', [object, objectExpression])
}

function groupAddMember (group, member) {
  let call = Node.expressionStatement(
    Node.callExpression(
      Node.memberExpression(
        Node.identifier(group),
        Node.identifier('add')
      ),
      [Node.identifier(member)]
    )
  )

  return call
}

node.body.push(groupAll())
node.body.push(paramFaceMaterial())
// node.body.push(groupAddMember('all', 'faceMaterial'))
node.body.push(paramBenchtopHeight())
// node.body.push(groupAddMember('all', 'benchtopHeight'))
node.body.push(componentBenchtop())
// node.body.push(groupAddMember('all', 'benchtop'))

module.exports = node
