import Node from './node'
import {
  Entity,
  ArrayEntity,
  ComponentEntity,
  GroupEntity,
  ObjectEntity,
  ParamEntity } from './entities'
import { ParamData, SavedData } from './types/massive'

export default class Interpreter {
  context: Array<Node>
  contextStack: Array<Entity>
  outputStack: Array<Node>
  currentBody: Node
  isGettable: Boolean
  input: Node
  inside: string
  output: Node
  inputPos: number
  inputNode: Node
  // parent: any
  currentParentName: string
  // data:  SavedData
  inAttributes: Boolean
  inComponent: Boolean
  inGroup: Boolean
  inParam: Boolean
  stack: Array<Array<Node>>

  constructor (ast: Node) {
    this.input    = ast
    this.inputPos = 0

    /* Keep track of what command we're inside of. */
    this.context = []
    this.contextStack = [new ObjectEntity()]
    this.currentBody = Node.program()
    this.output = this.currentBody
    this.outputStack = [this.currentBody]
    this.inAttributes = this.inGroup = this.inParam = this.inComponent = false
    this.currentParentName = 'object'

    /* Keep track of what type of node we're in when walking an expression. */
    this.inside = ''

    /* Signals if an expression needs to be wrapped in an arrow function. */
    this.isGettable = false

    /* Identifiers are kept in nested arrays. */
    this.stack = [[]]
  }

  // Compile kicks off the interpreter.  Iterate over each node in the input
  // body, compile it and add result to the output.
  compile (): Node {
    this.input.body.forEach((n: Node) => {
      this.compileNode(n)
    })

    return this.output
  }

  compileNode (node: Node): void {
    switch (node.type) {
      case 'BlockStatement': this.blockStatement(node); break

      case 'CommandStatement': this.commandStatement(node); break

      case 'FunctionDeclaration': this.functionDeclaration(node); break

      case 'IfStatement': this.ifStatement(node); break

      case 'VariableDeclaration':
      this.variableDeclaration(node)
      break

      default:
    }
  }

  /**
  Return the Node to whose body statements are being added
  */
  body (): Node {
    return this.outputStack[this.outputStack.length - 1]
  }

  accept (entity: Entity): Node {
    for (let i = this.contextStack.length - 1; i >= 0; i--) {
      var acceptor = this.contextStack[i].accept(entity)

      if (acceptor) return acceptor
    }

    return null
  }

  append (node: Node): void {
    var body = this.outputStack[this.outputStack.length - 1]
    if (body instanceof Array) {
      body.push(node)
    } else if (body instanceof Node) {
      this.append(node)
    }
  }

  /**
  Iterate over nodes in a block.  Some nodes can be modified in place, others
  must be removed and a replacement spliced in.
  */
  blockStatement (block: Node): void {
    block.body.forEach((n: Node) => {
      this.compileNode(n)
    })
  }

  commandStatement (command: Node): void {
    let details = Interpreter.analyzeCommand(command)

    switch (details.name) {
      // case 'attributes': this.attributes(command, details); break
      case 'box': this.box(command); break
      case 'component': this.component(command); break
      case 'group': this.group(command, details); break
      case 'meta': this.meta(command, details); break
      case 'param': this.param(command); break

      default:
    }
  }

  box
  (command: Node): void {
    this.body().append(
        Node.variableDeclaration(
        'var',
        [
          Node.variableDeclarator(
            Node.identifier(command.id.name),
            Node.callExpression('box', [this.generateOptionsObject(command)])
          )
        ]
      )
    )
  }

  component (command: Node): void {
    this.body().append(
      Node.variableDeclaration(
        'var',
        [Node.variableDeclarator(
          command.id,
          Node.callExpression(
            'component',
            [this.generateOptionsObject(command)]
          )
        )]
      )
    )

    Object.defineProperty(command.id, 'referenceType', { value: 'component' })
    this.pushToStack(command.id)

    var entity = Interpreter.entity(command)
    this.body().append(this.accept(entity))

    this.openScope(entity)
    this.compileNode(command.body)
    this.closeScope()
  }

  functionDeclaration (node: Node): void {
    this.outputStack.push(node.body)
    this.stack.push([])
    this.compileNode(node.body)
    this.outputStack.pop()
    this.stack.pop()
    this.body().append(node)
  }

  group (command: Node, details: { id: string, options: Array<Node> }): void {
    this.inGroup = true



    let name = Node.identifier('name')
    let parent = Node.identifier(this.currentParentName)
    let optionsObject: Node = this.generateOptionsObject(command)
    let call: Node = Node.callExpression('group', [parent, optionsObject])
    let declarator = Node.variableDeclarator(command.id, call)
    let node: Node = Node.variableDeclaration('var', [declarator])

    this.body().append(node)

    var entity = Interpreter.entity(command)
    this.body().append(this.accept(entity))

    this.openScope(entity)
    command.body.forEach((n: Node) => {
      this.compileNode(n)
    })
    this.closeScope()

    this.inGroup = false
  }

  ifStatement (node: Node): void  {
    node.test = this.walkExpression(node.test)
    this.compileNode(node.consequent)
    if (node.alternate) this.compileNode(node.alternate)
    this.append(node)
  }

  meta
  (command: Node, details: {id: string, options: Array<Node> }): void {
    details.options.forEach((option: any) => {
      this.output.body.push(
        Node.expressionStatement(
          Node.assignmentExpression(
            Node.memberExpression(
              Node.identifier('object'),
              Node.identifier(option.label.name)
            ),
            '=',
            this.walkExpression(option.body.expression)
          )
        )
      )
    })
  }

  variableDeclaration (node: Node): void {
    node.declarations.forEach((dec: Node) => {
      this.pushToStack(dec.id)
    })

    this.currentBody.append(node)
  }

  generateOptionsObject (command: Node): Node {
    var i = 0, properties: Array<Node> = []

    var current: Node = command.body.body[i]
    var type = current.type
    while (type === 'LabeledStatement') {
      var key   = current.label
      var value = this.walkExpression(current.body.expression)

      if (this.isGettable) {
        value = Node.arrowFunctionExpression([], value)
        this.isGettable = false
      }

      properties.push(Node.property(key, value))

      current = command.body.body[++i]
      type = current ? current.type : null
    }

    return Node.objectExpression(properties)
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

  openScope (entity: Entity): void {
    this.contextStack.push(entity)
    this.stack.push([])
  }

  closeScope (): void {
    this.contextStack.pop()
    this.stack.pop()
  }

  addIdtoCurrentScope (id: Node): void {
    this.getCurrentScope().push(id)
  }

  param
  (command: Node): void {

    this.body().append(
      Node.variableDeclaration(
        'var',
        [Node.variableDeclarator(
          command.id,
          Node.callExpression(
            'param',
            [this.generateOptionsObject(command)]
          )
        )]
      )
    )

    Object.defineProperty(command.id, 'referenceType', { value: 'param' })
    this.pushToStack(command.id)

    var entity = Interpreter.entity(command)
    this.body().append(this.accept(entity))
  }

  /* Push node onto scope stack. */
  pushToStack (node: Node) {
    let scope = this.getCurrentScope()
    scope.push(node)
  }

  // startEntity (node: Node): void {
  //   this.contextStack.push(Interpreter.entity(node))
  // }
  //
  // endEntity (): void {
  //   this.contextStack.pop()
  // }

  /* Walk an expression and make identifiers that reference params gettable. */
  walkExpression (expr: Node): Node {

    switch (expr.type) {
      case 'ArrayExpression':
      let elements: Array<Node> = []
      expr.elements.forEach((el: Node) => {
        elements.push(this.walkExpression(el))
      })

      return Node.arrayExpression(elements)

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
        this.walkExpression(expr.property),
        expr.computed
      )
      this.inside = ''
      return node

      default:
      return expr
    }
  }

  /* Static methods */

  /**
  Extract a command's name, identifier and options.
  */
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

  static entity (node: Node): Entity {
    switch (node.name.name) {
      case 'array':
      return new ArrayEntity(node)

      case 'component':
      return new ComponentEntity(node)

      case 'group':
      return new GroupEntity(node)

      case 'param':
      return new ParamEntity(node)

      default:
      return null
    }
  }

  static enumerateParams
  (parent: {params: Array<any>, parent?: any}): Array<any> {
    let result: Array<any> = []

    if(!(parent = parent.parent)) {
      return
    }

    parent.params.forEach((param: any, i: number) => {
      result.push({name: param.name, index: i})
    })

    return result
  }

  static makeIdentifierGettable (id: Node): Node {
    let prop: Node = Node.identifier('get')
    let obj: Node  = Node.identifier(id.name)
    let me: Node   = Node.memberExpression(obj, prop)
    let node: Node = Node.callExpression(me)

    return node
  }

  /**
   * Make an option's value equal to the saved parameter's value.
   */
  static modifyParamOptions
  (options: Array<Node>, savedParam: ParamData) {
    console.log(savedParam)
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

      if (option) {
        option.value.value = savedParam.accessor
      } else {
        options.push(Node.property(
          Node.identifier('accessor'),
          Node.literal(savedParam.accessor)
        ))
      }
    }
  }
}
