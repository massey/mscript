/**
Identifiers that begin with a '$' should be converted to a string literal.
*/

const Node = require('../../dist/node.js').default

var node = Node.program()

/* param width */
function paramWidth () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('number')))
  properties.push(Node.property(Node.identifier('value'), Node.literal(1000)))
  properties.push(Node.property(Node.identifier('name'), Node.literal('width')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('object')
  let call = Node.callExpression(Node.identifier('param'), [object, objectExpression])
  let id = Node.identifier('width')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

function paramDepth () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('number')))
  properties.push(Node.property(Node.identifier('value'), Node.literal(600)))
  properties.push(Node.property(Node.identifier('name'), Node.literal('depth')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('object')
  let call = Node.callExpression(Node.identifier('param'), [object, objectExpression])
  let id = Node.identifier('depth')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

function paramFaceMaterial () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('object')))
  properties.push(Node.property(Node.identifier('source'), Node.identifier('materials')))
  properties.push(Node.property(Node.identifier('name'), Node.literal('faceMaterial')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('object')
  let call = Node.callExpression(Node.identifier('param'), [object, objectExpression])
  let id = Node.identifier('faceMaterial')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

function componentBase () {
  let properties = []

  /* options values */
  let A = Node.arrowFunctionExpression([], Node.binaryExpression(
    Node.callExpression(Node.memberExpression(
      Node.identifier('width'), Node.identifier('get')
    )),
    '+',
    Node.literal(100)
  ))
  let B = Node.arrowFunctionExpression([], Node.callExpression(
    Node.memberExpression(Node.identifier('depth'), Node.identifier('get'))
  ))

  properties.push(Node.property(Node.identifier('A'), A))
  properties.push(Node.property(Node.identifier('B'), B))
  properties.push(Node.property(Node.identifier('material'), Node.literal('01.002')))
  properties.push(Node.property(Node.identifier('name'), Node.literal('base')))

  let objectExpression = Node.objectExpression(properties)
  let object = Node.identifier('object')
  let call = Node.callExpression(Node.identifier('component'), [object, objectExpression])
  let id = Node.identifier('base')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

node.body.push(paramWidth())
node.body.push(paramDepth())
node.body.push(paramFaceMaterial())
node.body.push(componentBase())

module.exports = node
