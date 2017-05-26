const Node = require('../../dist/node.js').default

module.exports ={
  caller: function (id, callee, args) {
    let call = Node.callExpression(callee, args)
    let declarator = Node.variableDeclarator(Node.identifier(id), call)

    return Node.variableDeclaration('var', [declarator])
  }
}
