export default class Node {
  type: string
  [propName: string]: any

   constructor (type: string) {
     this.type = type
   }

   static arrayExpression (elements: Array<Node>): Node {
     let node: Node = new Node('ArrayExpression')
     node.elements = elements
     return node
   }

   /* Node factory methods. */
   static arrowFunctionExpression (params: Array<Node>, body: Node): Node {
     let node: Node = new Node('ArrowFunctionExpression')

     node.params     = params
     node.body       = body
     node.id         = null
     node.generator  = false
     node.expression = true

     return node
   }

   static binaryExpression (left: Node, operator: string, right: Node): Node {
     let node: Node = new Node('BinaryExpression')

     node.left     = left
     node.operator = operator
     node.right    = right

     return node
   }

   static callExpression (callee: any, args?: Array<Node>): Node {
     let node = new Node('CallExpression')

     if (typeof callee === 'string') {
       node.callee = Node.identifier(callee)
     } else if (callee instanceof Node) {
       node.callee = callee
     }

     node.arguments = args || []

     return node
   }

   static conditionalExpression
   (test: Node, consequent: Node, alternate: Node): Node {
     let node = new Node('ConditionalExpression')

     node.test       = test
     node.consequent = consequent
     node.alternate  = alternate

     return node
   }

   static expressionStatement (expression: Node): Node {
     let node = new Node('ExpressionStatement')

     node.expression = expression

     return node
   }

   static identifier (name: string): Node {
     let node = new Node('Identifier')
     node.name = name

     return node
   }

   static literal (value: any): Node {
     let node = new Node('Literal')

     node.value = value

     return node
   }

   static memberExpression (obj: Node, property: Node): Node {
     let node: Node = new Node('MemberExpression')
     node.object = obj
     node.property = property
     return node
   }

   static objectExpression (properties: Array<Node>): Node {
     let node = new Node('ObjectExpression')
     node.properties = properties || []
     return node
   }

   static property (key: Node, value: Node): Node {
     let node = new Node('Property')

     node.key = key
     node.value = value

     return node
   }

   static program (): Node {
     let node = new Node('Program')
     node.body = []

     return node
   }

   static variableDeclaration (kind: string, declarations: Array<Node>): Node {
     let node = new Node('VariableDeclaration')

     node.kind = kind
     node.declarations = declarations || []

     return node
   }

   static variableDeclarator (id: Node, init: Node): Node {
     let node = new Node('VariableDeclarator')
     node.id = id
     node.init = init

     return node
   }
}
