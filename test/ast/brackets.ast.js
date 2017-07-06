/**
Expected transpiled code result:

```
var base = component(object, {
  A: height + (width ? 50 : depth),
  name: 'base'
})
```
*/

const Node = require('../../dist/node.js').default

var node = Node.program()

/* param width */
function paramWidth () {
  let properties = []

  let A = Node.binaryExpression(
    Node.identifier('height'),
    '+',
    Node.conditionalExpression(
      Node.identifier('width'),
      Node.literal(50),
      Node.identifier('depth')
    )
  )

  properties.push(Node.property(Node.identifier('A'), A))
  properties.push(Node.property(Node.identifier('name'), Node.literal('base')))

  let declarator = Node.variableDeclarator(
    Node.identifier('base'),
    Node.callExpression(
      'component',
      [
        Node.identifier('object'),
        Node.objectExpression(properties)
      ]
    )
  )

  return Node.variableDeclaration('var', [declarator])
}

node.body.push(paramWidth())

module.exports = node
