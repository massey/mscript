import Node from './node'
import {
  Entity,
  ArrayEntity,
  ComponentEntity,
  GroupEntity,
  ObjectEntity,
  ParamEntity } from './entities'
import { ParamData, SavedData } from './types/massive'

interface scope {
  identifiers: Array<Node>,
  entity: Entity,
  body: Array<Node>
}

export default class Interpreter {
  // isGettable: Boolean
  input: Node
  inside: string
  output: Node
  inputPos: number
  inputNode: Node
  currentParentName: string
  inAttributes: Boolean
  inComponent: Boolean
  // inGroup: Boolean
  // inParam: Boolean
  makeGettable: Boolean
  result: Node
  stack: Array<scope>
  expressionStack: Array<Node>

  constructor (ast: Node) {
    this.result = Node.program()
    this.input    = ast
    this.inputPos = 0
    // this.inAttributes = this.inGroup = this.inParam = this.inComponent = false
    this.currentParentName = 'object'

    /* Keep track of what type of node we're in when walking an expression. */
    this.inside = ''

    /* Signals if an expression needs to be wrapped in an arrow function. */
    // this.isGettable = false

    this.makeGettable = true

    this.expressionStack = []
    this.stack = [
      { identifiers: [], entity: new ObjectEntity(), body: [this.result.body] }
    ]
  }

  // Compile kicks off the interpreter.  Iterate over each node in the input
  // body, compile it and add result to the output.
  compile (): Node {
    this.input.body.forEach((n: Node) => {
      this.compileNode(n)
    })

    return this.result
  }

  compileNode (node: Node): void {
    switch (node.type) {
      case 'BlockStatement': this.blockStatement(node); break
      case 'CommandStatement': this.commandStatement(node); break
      case 'ExpressionStatement': this.expressionStatement(node); break
      case 'ForStatement': this.forStatement(node); break
      case 'FunctionDeclaration': this.functionDeclaration(node); break
      case 'IfStatement': this.ifStatement(node); break
      case 'ReturnStatement': this.returnStatement(node); break
      case 'VariableDeclaration': this.variableDeclaration(node); break

      default:
    }
  }

  /** Search the stack for the entity that will accept the given entity. */
  accept (entity: Entity, node?: Node): Node {
    for (let i = this.stack.length; --i >= 0;) {
      var acceptor = this.stack[i].entity.accept(entity, node)

      if (acceptor) return acceptor
    }

    return null
  }

  append (node: Node): void {
    if (node) {
      var scope = this.top()

      scope.body[scope.body.length - 1].push(node)
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
      case 'array': this.array(command); break
      case 'box': this.box(command); break
      case 'component': this.component(command); break
      case 'group': this.group(command, details); break
      case 'meta': this.meta(command, details); break
      case 'param': this.param(command); break

      default:
      this.defaultCommand(command)
    }
  }

  array (command: Node): void {
    var node = Node.functionExpression(null, [])

    var entity = Interpreter.entity(command)
    this.stack.push({ identifiers: [], entity, body: [node.body.body] })

    this.append(
      Node.variableDeclaration(
        'var',
        [
          Node.variableDeclarator(
            Node.identifier('arr'),
            Node.arrayExpression()
          )
        ]
      )
    )

    this.compileNode(command.body)

    this.append(Node.returnStatement(Node.identifier('arr')))

    this.stack.pop()

    this.append(this.accept(entity, node))
  }

  box (command: Node): void {
    this.append(
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
    var entity = Interpreter.entity(command)
    var call = Node.callExpression(
      'component',
      [this.generateOptionsObject(command)]
    )

    if (command.id) {
      Object.defineProperty(command.id, 'referenceType', { value: 'component' })
      this.pushId(command.id)
      this.append(
        Node.variableDeclaration(
          'var',
          [Node.variableDeclarator(
            command.id,
            call
          )]
        )
      )
      this.append(this.accept(entity))
    } else {
      this.append(this.accept(entity, call))
    }

    if (command.body) {
      var scope = Node.functionExpression(null, [])

      this.enterScope({ identifiers: [], entity, body: [scope.body.body] })
      this.compileNode(command.body)
      this.closeScope()

      this.append(
        Node.expressionStatement(
          Node.callExpression(
            scope
          )
        )
      )
    }
  }

  defaultCommand (command: Node): void {
    var tagged = new Node()
    tagged.tag = command.name.name
    var options = this.generateOptionsObject(command)

    for (let i = 0; i < options.properties.length; i++) {
      var currentProperty = options.properties[i]
      tagged[currentProperty.key.name] = currentProperty.value.value
    }

    this.append(tagged)
  }

  expressionStatement (node: Node) {
    node.expression = this.walkExpression(node.expression)
    this.append(node)
  }

  forStatement (node: Node): void {
    node.test = this.walkExpression(node.test)

    var block = Node.blockStatement()
    this.top().body.push(block.body)
    this.compileNode(node.body)
    this.top().body.pop()
    node.body = block
    this.append(node)
  }

  functionDeclaration (node: Node): void {
    Object.defineProperty(node.id, 'referenceType', { value: 'function' })
    this.pushId(node.id)
    var block = Node.blockStatement()
    this.enterScope({ identifiers: [], entity: null, body: [block.body] })
    this.compileNode(node.body)
    this.closeScope()
    node.body = block
    this.append(node)
  }

  group (command: Node, details: { id: string, options: Array<Node> }): void {
    var entity = Interpreter.entity(command)
    this.makeGettable = false
    var call = Node.callExpression(
      'group',
      [this.generateOptionsObject(command)]
    )
    this.makeGettable = true

    if (command.id) {
      Object.defineProperty(command.id, 'referenceType', { value: 'group' })
      this.pushId(command.id)
      this.append(
        Node.variableDeclaration(
          'var',
          [Node.variableDeclarator(
            command.id,
            call
          )]
        )
      )
      this.append(this.accept(entity))
    } else {
      this.append(this.accept(entity, call))
    }

    if (command.body) {
      var scope = Node.functionExpression(null, [])

      this.enterScope({ identifiers: [], entity, body: [scope.body.body] })
      this.compileNode(command.body)
      this.closeScope()

      this.append(
        Node.expressionStatement(
          Node.callExpression(
            scope
          )
        )
      )
    }
  }

  ifStatement (node: Node, parent?: Node): void  {
    node.test = this.walkExpression(node.test)

    var consequent = Node.blockStatement()
    this.top().body.push(consequent.body)
    this.compileNode(node.consequent)
    this.top().body.pop()
    node.consequent = consequent

    if (node.alternate) {
      if (node.alternate.type === 'BlockStatement') {
        var alternate = Node.blockStatement()
        this.top().body.push(alternate.body)
        this.compileNode(node.alternate)
        this.top().body.pop()
        node.alternate = alternate
      } else {
        this.ifStatement(node.alternate, node)
      }
    }

    if (!parent) {
      this.append(node)
    } else {
      parent.alternate = node
    }
  }

  meta
  (command: Node, details: {id: string, options: Array<Node> }): void {
    details.options.forEach((option: any) => {
      this.append(
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

  returnStatement (node: Node) {
    node.argument = this.walkExpression(node.argument)
    this.append(node)
  }

  variableDeclaration (node: Node): void {
    node.declarations.forEach((dec: Node) => {
      this.pushId(dec.id)
    })

    this.append(node)
  }

  /**
  Generate an object expression from the labeled statements in a command body.
  Shift the labeled statements from the front so the proper body is left behind.
  */
  generateOptionsObject (command: Node): Node {
    var properties: Array<Node> = []
    var current: Node = command.body.body[0].type === 'LabeledStatement'
                        ? command.body.body.shift()
                        : null

    while (current) {
      var key   = current.label
      var value = this.walkExpression(current.body.expression)

      if (value.wrapInFunction) {
        value = Node.arrowFunctionExpression([], value)
        // this.isGettable = false
      }

      properties.push(Node.property(key, value))

      if (command.body.body.length) {
        current = command.body.body[0].type === 'LabeledStatement'
                  ? command.body.body.shift()
                  : null
      } else {
        current = null
        command.body = null
      }
    }

    return Node.objectExpression(properties)
  }

  findIdentifier (name: string): Node {
    var result, id

    for (let i = this.stack.length; --i >= 0;) {
      for (let j = this.stack[i].identifiers.length; --j >= 0;) {
        id = this.stack[i].identifiers[j]

        if (id.name === name) {
          result = id
          break
        }
      }
    }

    return result
  }

  enterScope (scope: scope) {
    this.stack.push(scope)
  }

  closeScope (): scope {
    return this.stack.pop()
  }

  param
  (command: Node): void {

    this.append(
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
    this.pushId(command.id)

    var entity = Interpreter.entity(command)
    this.append(this.accept(entity))
  }

  /** Push an identifier onto the top identifier array*/
  pushId (id: Node) {
    this.top().identifiers.push(id)
  }

  top () {
    return this.stack[this.stack.length - 1]
  }

  /* Walk an expression and make identifiers that reference params gettable. */
  walkExpression (expr: Node): Node {
    this.expressionStack.push(expr)

    switch (expr.type) {
      case 'ArrayExpression':
      for (let i = 0; i < expr.elements.length; i++) {
        expr.elements[i] = this.walkExpression(expr.elements[i])
      }
      return this.expressionStack.pop()
      // let elements: Array<Node> = []
      // expr.elements.forEach((el: Node) => {
      //   elements.push(this.walkExpression(el))
      // })
      //
      // return Node.arrayExpression(elements)

      case 'AssignmentExpression':
      expr.right = this.walkExpression(expr.right)
      return this.expressionStack.pop()

      case 'BinaryExpression':
      expr.left = this.walkExpression(expr.left)
      expr.right = this.walkExpression(expr.right)
      return this.expressionStack.pop()

      case 'CallExpression':
      Object.defineProperty(
        this.expressionStack[0],
        'containsCallExpression',
        { value: true }
      )
      for (let i = 0; i < expr.arguments.length; i++) {
        expr.elements[i] = this.walkExpression(expr.elements[i])
      }
      expr.callee = this.walkExpression(expr.callee)
      return this.expressionStack.pop()

      case 'ConditionalExpression':
      expr.test = this.walkExpression(expr.test)
      expr.consequent = this.walkExpression(expr.consequent)
      expr.alternate = this.walkExpression(expr.alternate)
      return this.expressionStack.pop()

      case 'Identifier':
      let id = this.findIdentifier(expr.name)
      if (id) {
        if (id.referenceType === 'param' && this.makeGettable) {
          this.expressionStack.pop()
          this.expressionStack.push(Interpreter.makeIdentifierGettable(expr))
          Object.defineProperty(
            this.expressionStack[0],
            'wrapInFunction',
            { value: true }
          )
        } else if (id.referenceType === 'component' ||
                   id.referenceType === 'function') {
          Object.defineProperty(
            this.expressionStack[0],
            'wrapInFunction',
            { value: true }
          )
        }
        return this.expressionStack.pop()
      }
      return this.expressionStack.pop()

      case 'Literal':
      return this.expressionStack.pop()

      case 'MemberExpression':
      expr.object = this.walkExpression(expr.object)
      expr.property = this.walkExpression(expr.property)
      return this.expressionStack.pop()

      default:
      return this.expressionStack.pop()
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
