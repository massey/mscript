const Node = require('../../dist/node.js').default

var node = Node.program()

function groups () {
  return Node.expressionStatement(
    Node.assignmentExpression(
      Node.memberExpression(
        Node.identifier('parent'),
        Node.identifier('groups')
      ),
      '=',
      Node.arrayExpression(
        [
          Node.literal('all')
        ]
      )
    )
  )
}

function name () {
  return Node.expressionStatement(
    Node.assignmentExpression(
      Node.memberExpression(
        Node.identifier('parent'),
        Node.identifier('name')
      ),
      '=',
      Node.literal('Base Single')
    )
  )
}

function description () {
  return Node.expressionStatement(
    Node.assignmentExpression(
      Node.memberExpression(
        Node.identifier('parent'),
        Node.identifier('description')
      ),
      '=',
      Node.literal('Base cabinet single door')
    )
  )
}

node.body.push(groups())
node.body.push(name())
node.body.push(description())

module.exports = node
