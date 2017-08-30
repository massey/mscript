export default class Node {
  type: string
  [propName: string]: any

   constructor (type?: string) {
     if (type) this.type = type
   }

   // Append a Node to the body.  This must handle cases where a Node's body is
   // another Node like a BlockStatement.  If it doesn't have a body,
   // don't do anything.
   append (node: Node): void {
     if (this.body instanceof Array) {
       this.body.push(node)
     } else if (this.body instanceof Node) {
       this.body.append(node)
     }
   }

   static arrayExpression (elements?: Array<Node>): Node {
     let node: Node = new Node('ArrayExpression')
     node.elements = elements || []
     return node
   }

   static assignmentExpression
   (left: Node, operator: string, right: Node): Node {
     let node: Node = new Node('AssignmentExpression')

     node.left     = left
     node.operator = operator
     node.right    = right

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

   static blockStatement (): Node {
     var node: Node = new Node('BlockStatement')

     node.body = []

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

   static functionDeclaration
   (
     id: Node,
     params: Array<Node>,
     body: Array<Node>,
     options?: {generator?: boolean, expression?: boolean}
   ): Node {
     var node = new Node('FunctionDeclaration')

     node.id = id
     node.params = params
     node.body = body
     node.generator = options ? options.generator || false : false
     node.expression = options ? options.expression || false : false

     return node
   }

   static
   functionExpression
   (
     id: Node,
     params: Array<Node>,
     options?: {generator?: boolean, expression?: boolean}
   ): Node {
     var node = new Node('FunctionExpression')

     node.id = id
     node.params = params
     node.body = Node.blockStatement()
     node.generator = options ? options.generator || false : false
     node.expression = options ? options.expression || false : false

     return node
   }

   static identifier (name: string): Node {
     let node = new Node('Identifier')
     node.name = name

     return node
   }

   static labeledStatement (label: string, expression: Node): Node {
     let node = new Node('LabeledStatement')

     node.label = Node.identifier(label)
     node.body  = expression

     return node
   }

   static literal (value: any): Node {
     let node = new Node('Literal')

     node.value = value
     node.raw = typeof value === 'number'
                ? value.toString()
                : `'${value}'`

     return node
   }

   static memberExpression (obj: Node, property: Node, computed?: Boolean): Node {
     let node: Node = new Node('MemberExpression')
     node.object = obj
     node.property = property
     node.computed = computed || false
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
     node.computed = false
     node.kind = 'init'
     node.method = false
     node.shorthand = false

     return node
   }

   static program (): Node {
     let node = new Node('Program')
     node.body = []
     node.sourceType = 'script'

     return node
   }

   static returnStatement (argument: Node): Node {
     var node = new Node('ReturnStatement')

     node.argument = argument

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
