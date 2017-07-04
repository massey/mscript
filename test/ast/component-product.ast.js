/*
Expected transpiled code result:

component(parent, {
  code: '00.000',
  quantity: 4
})
*/

const Node = require('../../dist/node.js').default

var node = Node.program()

function component () {
  return Node.expressionStatement(
    Node.callExpression(
      Node.identifier('component'),
      [
        Node.identifier('parent'),
        Node.objectExpression([
          Node.property(Node.identifier('code'), Node.literal('00.000')),
          Node.property(Node.identifier('quantity'), Node.literal(4)),
        ])
      ]
    )
  )
}

node.body.push(component())

module.exports = node
