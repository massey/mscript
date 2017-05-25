import Node from './node'

export default class Interpreter {
  context: Array<Node>
  input: Node
  output: Node
  inputPos: number
  inputNode: Node
  data:  object
  inComponent: Boolean
  inParam: Boolean
  stack: Array<Array<Node>>

  constructor (ast: Node, data?: object) {
    this.input    = ast
    this.inputPos = 0
    this.data     = data

    /* Keeps track of what command we're inside of. */
    this.context = []
    this.inParam = this.inComponent = false

    /* Identifiers are kept in nested arrays. */
    this.stack = []
  }

  compile (): Node {
    this.inputNode = this.input.body[this.inputPos]

    let node = this.output = Node.program()

    this.openScope(node)

    this.input.body.forEach((inputNode: Node) => {
      this.compileNode(inputNode)
    })

    return this.output
  }

  compileNode (inputNode: Node) {

    switch (inputNode.type) {
      case 'CommandStatement': this.commandStatement(inputNode)
      default:
    }
  }

  commandStatement (command: Node) {
    let details = Interpreter.analyzeCommand(command)

    switch (details.name) {
      case 'component': this.component(command, details); break
      case 'param': this.param(command, details); break
      default:
    }
  }

  component
  (command: Node, details: {id: string, options: Array<Node> }): void {
    this.inComponent = true

    let properties: Array<Node> = this.convertOptions(details.options)
    let name = Node.identifier('name')
    properties.push(Node.property(name, Node.literal(details.id)))
    let parent = Node.identifier('parent')
    let optionsObject: Node = Node.objectExpression(properties)
    let call: Node = Node.callExpression('component', [parent, optionsObject])
    let id: Node   = Node.identifier(details.id)
    let declarator = Node.variableDeclarator(id, call)
    let node: Node = Node.variableDeclaration('var', [declarator])

    this.inComponent = false

    this.output.body.push(node)
  }

  convertOptions (options: Array<Node>): Array<Node> {
    let nodes: Array<Node> = []

    options.forEach((option: Node) => {
      nodes.push(this.convertLabeledStatementToProperty(option))
    })

    return nodes
  }

  convertLabeledStatementToProperty (labeledStatement: Node): Node {
    let key   = labeledStatement.label
    let value = labeledStatement.body.expression

    value = this.walkExpression(value)

    if (value.type !== 'Literal') {
      value = Node.arrowFunctionExpression([], value)
    } else if (value.type === 'Literal') {
      value = Node.literal(value.value)
    }

    return Node.property(Node.identifier(key.name), value)
  }

  findIdentifier (name: string): Node {
    var result, id

    for (let i = this.stack.length; --i >= 0;) {
      for (let j = this.stack[i].length; --j >= 0;) {
        id = this.stack[i][j]

        if (id.name === name) {
          result = id
          break
        }
      }
    }

    return result
  }

  getCurrentContext () {
    return this.context[this.context.length - 1]
  }

  getCurrentScope (): Array<Node> {
    return this.stack[this.stack.length - 1]
  }

  getOptions (command: Node): Array<Node> {
    let body: Node = command.body.body

    return body.filter((option: Node) => {
      return option.type === 'LabeledStatement'
    })
  }

  openScope (context: Node) {
    this.context.push(context)
    this.stack.push([])
  }

  closeScope () {
    this.context.pop()
    this.stack.pop()
  }

  addIdtoCurrentScope (id: Node): void {
    this.getCurrentScope().push(id)
  }

  param (command: Node, details: {id: string, options: Array<Node> }): void {
    this.inParam = true

    let properties: Array<Node> = this.convertOptions(details.options)
    let name = Node.identifier('name')
    properties.push(Node.property(name, Node.literal(details.id)))
    let optionsObject: Node = Node.objectExpression(properties)
    let parent = Node.identifier('parent')
    let call: Node = Node.callExpression('param', [parent, optionsObject])
    let id: Node   = Node.identifier(details.id)
    let declarator = Node.variableDeclarator(id, call)
    let node: Node = Node.variableDeclaration('var', [declarator])

    Object.defineProperty(id, 'referenceType', { value: 'param'})
    this.pushToStack(id)

    this.inParam = false

    this.output.body.push(node)
  }

  /* Push node onto scope stack. */
  pushToStack (node: Node) {
    let scope = this.getCurrentScope()
    scope.push(node)
  }

  /* Walk an expression and make identifiers that reference params gettable. */
  walkExpression (expr: Node): Node {

    switch (expr.type) {
      case 'BinaryExpression':
      return Node.binaryExpression(
        this.walkExpression(expr.left),
        expr.operator,
        this.walkExpression(expr.right)
      )

      case 'ConditionalExpression':
      return Node.conditionalExpression(
        this.walkExpression(expr.test),
        this.walkExpression(expr.consequent),
        this.walkExpression(expr.alternate)
      )

      case 'Identifier':
      let id = this.findIdentifier(expr.name)
      if (id) {
        if (id.referenceType === 'param') {
          return Interpreter.makeIdentifierGettable(expr)
        }
      }

      return Node.identifier(expr.name)

      case 'MemberExpression':
      return Node.memberExpression(
        this.walkExpression(expr.object),
        this.walkExpression(expr.property)
      )

      default:
      return expr
    }
  }

  /* Static methods */
  static analyzeCommand
  (command: Node): {name: string, id: string, options: Array<Node>} {
    let name: string = command.name.name
    let id: string   = command.id.name
    let options: Array<Node> = command.body.body.filter((node: Node) => {
      return node.type === 'LabeledStatement'
    })

    return {
      name,
      id,
      options
    }
  }

  static makeIdentifierGettable (id: Node): Node {
    let prop: Node = Node.identifier('get')
    let obj: Node  = Node.identifier(id.name)
    let me: Node   = Node.memberExpression(obj, prop)
    let node: Node = Node.callExpression(me)

    return node
  }
}
