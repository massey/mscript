import Node from './node'

export default class Interpreter {
  input: Node
  inputPos: number
  inputNode: Node
  data:  object
  context: Array<Node>
  stack: Array<Array<object>>

  constructor (ast: Node, data?: object) {
    this.input = ast
    this.inputPos = 0
    this.data  = data

    /* Keeps track of what command we're inside of. */
    this.context = []

    /* Identifiers are kept in nested arrays. */
    this.stack = []
  }

  compile (): Node {
    this.inputNode = this.input.body[this.inputPos]

    let node: Node = Node.program()

    this.openScope(node)

    this.input.body.forEach((inputNode: Node) => {
      node.body.push(this.compileNode(inputNode))
    })

    return node
  }

  compileNode (inputNode: Node) {

    switch (inputNode.type) {
      case 'CommandStatement': return this.commandStatement(inputNode)
      default:
    }
  }

  commandStatement (command: Node) {
    let details = Interpreter.analyzeCommand(command)

    switch (details.name) {
      case 'component': return this.component(command, details)
      case 'param': return this.param(command, details)
      default:
    }
  }

  component (command: Node, details: {id: string, options: Array<Node> }): Node {
    this.openScope(command)

    let properties: Array<Node> = Interpreter.convertOptions(details.options)
    properties.push(Node.property('name', Node.literal(details.id)))
    let optionsObject: Node = Node.objectExpression(properties)
    let call: Node = Node.callExpression('component', [optionsObject])
    let id: Node   = Node.identifier(details.id)
    let declarator = Node.variableDeclarator(id, call)
    let node: Node = Node.variableDeclaration('var', [declarator])

    this.closeScope()

    return node
  }

  getCurrentContext () {
    return this.context[this.context.length - 1]
  }

  getCurrentScope () {
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

  param (command: Node, details: {id: string, options: Array<Node> }): Node {
    this.openScope(command)

    let properties: Array<Node> = Interpreter.convertOptions(details.options)
    properties.push(Node.property('name', Node.literal(details.id)))
    let optionsObject: Node = Node.objectExpression(properties)
    let call: Node = Node.callExpression('param', [optionsObject])
    let id: Node   = Node.identifier(details.id)
    let declarator = Node.variableDeclarator(id, call)
    let node: Node = Node.variableDeclaration('var', [declarator])

    this.closeScope()

    return node
  }

  /* Static methods */
  static analyzeCommand (command: Node): {name: string, id: string, options: Array<Node>} {
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

  /**
   * Convert an array of LabeledStatements into Properties
   */
  static convertOptions (options: Array<Node>): Array<Node> {
    let nodes: Array<Node> = []

    options.forEach((option: Node) => {
      nodes.push(Interpreter.convertLabeledStatementToProperty(option))
    })

    return nodes
  }

  static convertLabeledStatementToProperty (labeledStatement: Node): Node {
    let key   = labeledStatement.label.name
    let value = labeledStatement.body.expression

    if (value.type !== 'Literal') {
      value = Node.arrowFunctionExpression([], value)
    }

    return Node.property(key, value)
  }

  static makeExpressionGettable () {

  }

  static makeIdentifierGettable (id: Node): Node {
    let prop = Node.identifier('get')
    let me = Node.memberExpression(id, prop)
    let node: Node = Node.callExpression(me)

    return node
  }
}
