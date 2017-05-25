const Node = require('../../dist/node.js').default

var node = Node.program()

/* param width */
function paramWidth () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('number')))
  properties.push(Node.property(Node.identifier('value'), Node.literal(200)))
  properties.push(Node.property(Node.identifier('name'), Node.literal('width')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  let call = Node.callExpression(Node.identifier('param'), [parent, objectExpression])
  let id = Node.identifier('width')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

/* param depth */
function paramDepth () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('string')))
  properties.push(Node.property(Node.identifier('value'), Node.literal('bye')))
  properties.push(Node.property(Node.identifier('name'), Node.literal('depth')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  let call = Node.callExpression(Node.identifier('param'), [parent, objectExpression])
  let id = Node.identifier('depth')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

/* param height */
function paramHeight () {
  let properties = []

  properties.push(Node.property(Node.identifier('type'), Node.literal('object')))
  properties.push(Node.property(Node.identifier('accessor'), Node.literal('bar')))
  properties.push(Node.property(Node.identifier('name'), Node.literal('height')))

  let objectExpression = Node.objectExpression(properties)
  let parent = Node.identifier('parent')
  let call = Node.callExpression(Node.identifier('param'), [parent, objectExpression])
  let id = Node.identifier('height')
  let declarator = Node.variableDeclarator(id, call)

  return Node.variableDeclaration('var', [declarator])
}

node.body.push(paramWidth())
node.body.push(paramDepth())
node.body.push(paramHeight())

module.exports = node
