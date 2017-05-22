export default class Node {
  type: string
  body?: any
  arguments?: Array<Node>
  [propName: string]: any

   constructor (type: string) {
     this.type = type
   }

   /* Node factory methods. */
   static callExpression (callee: string, args: Array<Node>): Node {
     let node = new Node('CallExpression')
     node.callee = Node.identifier(callee)
     node.arguments = args || []

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
     node.raw = value.toString()

     return node
   }

   static objectExpression (properties: Array<Node>): Node {
     let node = new Node('ObjectExpression')
     node.properties = properties || []

     return node
   }

   static property (key: string, value: Node): Node {
     let node = new Node('Property')
     node.key = Node.identifier(key)
     node.value = value

     node.kind = 'init'

     node.method    = false
     node.computed  = false
     node.shorthand = false

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

   static variableDeclarator (id: string, init: Node): Node {
     let node = new Node('VariableDeclarator')
     node.id = Node.identifier(id)
     node.init = init

     return node
   }
}
