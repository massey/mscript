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

node.body.push(groupAll())

module.exports = node
