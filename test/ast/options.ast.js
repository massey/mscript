const Node = require('../../dist/node.js').default

var node = Node.program()

function parentRadius () {
  return Node.variableDeclaration(
    'var',
    [Node.variableDeclarator(
      Node.identifier('radius'),
      Node.memberExpression(
        Node.memberExpression(
          Node.identifier('parent'),
          Node.memberExpression(
            Node.identifier('parent'),
            Node.identifier('params')
          )
        ),
        Node.literal(0),
        true
      )
    )]
  )
}

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

function componentBase () {
  return Node.variableDeclaration(
    'var',
    [Node.variableDeclarator(
      Node.identifier('base'),
      Node.callExpression(
        Node.identifier('component'),
        [
          Node.identifier('parent'),
          Node.objectExpression([
            Node.property(
              Node.identifier('A'),
              Node.arrowFunctionExpression(
                [],
                Node.binaryExpression(
                  Node.callExpression(
                    Node.memberExpression(
                      Node.identifier('width'),
                      Node.identifier('get')
                    )
                  ),
                  '-',
                  Node.callExpression(
                    Node.memberExpression(
                      Node.identifier('radius'),
                      Node.identifier('get')
                    )
                  )
                )
              )
            ),
            Node.property(
              Node.identifier('name'),
              Node.literal('base')
            )
          ])
        ]
      )
    )]
  )
}

node.body.push(parentRadius())
node.body.push(paramWidth())
node.body.push(paramDepth())
node.body.push(paramHeight())
node.body.push(componentBase())

module.exports = node
