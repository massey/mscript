import Node from './node'
import { ParamData, SavedData } from './types/massive'

export default class Interpreter {
  context: Array<Node>
  isGettable: Boolean
  input: Node
  inside: string
  output: Node
  inputPos: number
  inputNode: Node
  data:  SavedData
  inAttributes: Boolean
  inComponent: Boolean
  inGroup: Boolean
  inParam: Boolean
  stack: Array<Array<Node>>

  constructor (ast: Node, data?: SavedData) {
    this.input    = ast
    this.inputPos = 0
    this.data     = data

    /* Keep track of what command we're inside of. */
    this.context = []
    this.inAttributes = this.inGroup = this.inParam = this.inComponent = false

    /* Keep track of what type of node we're in when walking an expression. */
    this.inside = ''

    /* Signals if an expression needs to be wrapped in an arrow function. */
    this.isGettable = false

    /* Identifiers are kept in nested arrays. */
    this.stack = []
  }

  compile (): Node {
    // this.inputNode = this.input.body[this.inputPos]
    //
    this.output = Node.program()

    this.openScope(this.input)

    this.compileNode(this.input)

    return this.output
  }

  compileNode (node: Node) {

    switch (node.type) {
      case 'BlockStatement':
      node.body.forEach((n: Node) => {
        this.compileNode(n)
      })
      break

      case 'CommandStatement':
      this.commandStatement(node)
      break

      case 'Program':
      node.body.forEach((n: Node) => {
        this.compileNode(n)
      })
      break

      default:
    }
  }

  commandStatement (command: Node) {
    let details = Interpreter.analyzeCommand(command)

    switch (details.name) {
      case 'attributes': this.attributes(command, details); break
      case 'component': this.component(command, details); break
      case 'group': this.group(command, details); break
      case 'param': this.param(command, details); break

      default:
    }
  }

  //
  // Commands
  //

  attribute
  (command: Node): Node {
    let details: any = Interpreter.analyzeCommand(command)

    let properties: Array<Node> = this.convertOptions(details.options)
    properties.unshift(Node.property(
      Node.identifier('name'),
      Node.literal(details.name)
    ))

    let node = Node.objectExpression(properties)
    return node
  }

  attributes
  (command: Node, details: {options: Array<Node> }): void {
    let elements: Array<Node> = []

    command.body.body.forEach((n: Node) => {
      elements.push(this.attribute(n))
    })

    let attributes: Node = Node.arrayExpression(elements)
    let parent: Node = Node.identifier('parent')
    let call: Node = Node.callExpression('attributes', [parent, attributes])
    let node: Node = Node.expressionStatement(call)

    this.output.body.push(node)

    this.openScope(command)
    if (command.body) this.compileNode(command.body)
    this.closeScope()

    this.inAttributes = false
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

    Object.defineProperty(id, 'referenceType', { value: 'component'})
    this.pushToStack(id)

    this.output.body.push(node)

    if (this.inGroup) {
      let add = Node.expressionStatement(
        Node.callExpression(
          Node.memberExpression(
            Node.identifier(this.getCurrentContext().id.name),
            Node.identifier('add')
          ),
          [id]
        )
      )
      this.output.body.push(add)
    }

    this.inComponent = false
  }

  group
  (command: Node, details: {id: string, options: Array<Node> }): void {
    this.inGroup = true

    let properties: Array<Node> = this.convertOptions(details.options)
    let name = Node.identifier('name')
    properties.push(Node.property(name, Node.literal(details.id)))
    let parent = Node.identifier('parent')
    let optionsObject: Node = Node.objectExpression(properties)
    let call: Node = Node.callExpression('group', [parent, optionsObject])
    let id: Node   = Node.identifier(details.id)
    let declarator = Node.variableDeclarator(id, call)
    let node: Node = Node.variableDeclaration('var', [declarator])

    this.output.body.push(node)

    this.openScope(command)
    if (command.body) this.compileNode(command.body)
    this.closeScope()

    this.inGroup = false

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

    if (this.isGettable) {
      value = Node.arrowFunctionExpression([], value)
      this.isGettable = false
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

  openScope (context: Node): void {
    this.context.push(context)
    this.stack.push([])
  }

  closeScope (): void {
    this.context.pop()
    this.stack.pop()
  }

  addIdtoCurrentScope (id: Node): void {
    this.getCurrentScope().push(id)
  }

  param
  (command: Node, details: {id: string, options: Array<Node> }): void {
    this.inParam = true

    let properties: Array<Node> = this.convertOptions(details.options)

    if (this.data) {
      if (this.data.params) {
        let param = this.data.params.find((p: ParamData) => {
          return p.name === details.id
        })

        Interpreter.modifyParamOptions(properties, param)
      }
    }

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

    this.output.body.push(node)

    if (this.inGroup) {
      let add = Node.expressionStatement(
        Node.callExpression(
          Node.memberExpression(
            Node.identifier(this.getCurrentContext().id.name),
            Node.identifier('add')
          ),
          [id]
        )
      )
      this.output.body.push(add)
    }

    this.inParam = false
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
      if (expr.name[0] === '$') {
        return Node.literal(expr.name)
      }

      let id = this.findIdentifier(expr.name)
      if (id) {
        if (id.referenceType === 'param') {
          this.isGettable = true
          return Interpreter.makeIdentifierGettable(expr)
        } else if (id.referenceType === 'component') {
          this.isGettable = true
        }
      }

      return Node.identifier(expr.name)

      case 'Literal':
      return Node.literal(expr.value)

      case 'MemberExpression':
      this.inside = 'MemberExpression'
      let node = Node.memberExpression(
        this.walkExpression(expr.object),
        this.walkExpression(expr.property)
      )
      this.inside = ''
      return node

      default:
      return expr
    }
  }

  /* Static methods */
  static analyzeCommand
  (command: Node): {name: string, id: string, options: Array<Node>} {
    let name: string, id: string, options: Array<Node>

    name = command.name.name
    id = command.id ? command.id.name : null
    options = command.body.body.filter((node: Node) => {
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

  static modifyParamOptions
  (options: Array<Node>, savedParam: ParamData) {
    if (savedParam.value) {
      let option = options.find(o => {
        return o.key.name === 'value'
      })
      option.value.value = savedParam.value
    }

    if (savedParam.accessor) {
      let option = options.find(o => {
        return o.key.name === 'accessor'
      })
      option.value.value = savedParam.accessor
    }
  }
}
