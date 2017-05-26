const Node = require('../../dist/node.js').default
const caller = require('./ast_helpers.js').caller

var node = Node.program()

function groupAll () {
  let properties = []

  properties.push(Node.property(Node.identifier('name'), Node.literal('all')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  return caller('all', 'group', [parent, objectExpression])
}

function paramFaceMaterial () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('number')))
  properties.push(Node.property(Node.identifier('value'), Node.literal(600)))
  properties.push(Node.property(Node.identifier('name'), Node.literal('faceMaterial')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  return caller('faceMaterial', 'param', [parent, objectExpression])
}

function paramBenchtopHeight () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('number')))
  properties.push(Node.property(Node.identifier('value'), Node.literal(1000)))
  properties.push(Node.property(Node.identifier('name'), Node.literal('benchtopHeight')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  return caller('benchtopHeight', 'param', [parent, objectExpression])
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
node.body.push(groupAddMember('all', 'faceMaterial'))
node.body.push(paramBenchtopHeight())
node.body.push(groupAddMember('all', 'benchtopHeight'))

module.exports = node
