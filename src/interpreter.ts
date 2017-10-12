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
  body: Array<Node>,
  expression: Array<Node>
}

interface Transform {
  rotate: Array<Node>,
  translate: Array<Node>
}

export default class Interpreter {
  input: Node
  functionWrap: Boolean
  makeGettable: Boolean
  result: Node
  stack: Array<scope>
  transformStack: Transform

  constructor (ast: Node) {
    this.result = Node.program()
    this.input    = ast
    this.makeGettable = true
    this.functionWrap = true
    this.stack = [{
      identifiers: [],
      entity: new ObjectEntity(),
      body: [this.result.body],
      expression: []
    }]
    this.transformStack = {
      rotate: [],
      translate: []
    }
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
      case 'ArrowFunctionExpression': this.arrowFunctionExpression(node); break
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
      if (this.stack[i].entity === null) continue
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

  /** Arrow functions are not appended as they are return by walkExpression()*/
  arrowFunctionExpression (node: Node): void {
    var block = Node.blockStatement()
    this.enterScope({
      identifiers: [],
      entity: null,
      body: [block.body],
      expression: []
    })
    this.compileNode(node.body)
    this.closeScope()
    node.body = block
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
      case 'array': this.array(command); break
      case 'box': this.box(command); break
      case 'component': this.component(command); break
      case 'group': this.group(command, details); break
      case 'meta': this.meta(command, details); break
      case 'param': this.param(command); break
      case 'rotate': this.rotate(command); break
      case 'translate': this.translate(command); break

      default:
      this.defaultCommand(command)
    }
  }

  array (command: Node): void {
    var node = Node.functionExpression(null, [])

    var entity = Interpreter.entity(command)
    this.stack.push({ identifiers: [], entity, body: [node.body.body], expression: [] })

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
    Object.defineProperty(command.id, 'referenceType', { value: 'geometry' })
    this.pushId(command.id)

    this.append(
        Node.variableDeclaration(
        'var',
        [
          Node.variableDeclarator(
            command.id,
            Node.callExpression('box', [this.generateOptionsObject(command)])
          )
        ]
      )
    )
  }

  component (command: Node): void {
    var entity = Interpreter.entity(command)

    var options = this.generateOptionsObject(command)

    // If there are transorms on the stack, include them here
    if (this.transformStack.rotate.length || this.transformStack.translate.length) {
      options.properties.push(Interpreter.makeTransformProperty(this.transformStack))
    }

    var call = Node.callExpression(
      'component',
      [options]
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

      this.enterScope({ identifiers: [], entity, body: [scope.body.body], expression: [] })
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
    if (command.id) tagged.id = command.id.name
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

  findIdentifier (name: string): Node {
    var result, id, _break = false

    for (let i = this.stack.length; (--i >= 0) && !_break;) {
      for (let j = this.stack[i].identifiers.length; --j >= 0;) {
        id = this.stack[i].identifiers[j]

        if (id.name === name) {
          result = id
          _break = true
          break
        }
      }
    }

    return result
  }

  functionDeclaration (node: Node): void {
    Object.defineProperty(node.id, 'referenceType', { value: 'function' })
    this.pushId(node.id)
    var block = Node.blockStatement()
    this.enterScope({ identifiers: [], entity: null, body: [block.body], expression: [] })
    this.compileNode(node.body)
    this.closeScope()
    node.body = block
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

  group (command: Node, details: { id: string, options: Array<Node> }): void {
    var entity = Interpreter.entity(command)
    this.makeGettable = false
    this.functionWrap = false
    var call = Node.callExpression(
      'group',
      [this.generateOptionsObject(command)]
    )
    this.makeGettable = true
    this.functionWrap = true

    var scope
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
      let id = command.name.name + '_'  + this.stack.length
      scope = Node.functionExpression(null, [])
      entity.id = id
      command.id = Node.identifier(id)
      Object.defineProperty(command.id, 'referenceType', { value: 'group' })
      this.pushId(command.id)
      scope.body.body.push(
        Node.variableDeclaration(
          'var',
          [Node.variableDeclarator(
            command.id,
            call
          )]
        )
      )
      scope.body.body.push(this.accept(entity))
    }

    if (command.body) {
      scope = scope || Node.functionExpression(null, [])

      this.enterScope({ identifiers: [], entity, body: [scope.body.body], expression: [] })
      this.compileNode(command.body)
      this.closeScope()
    }
    if (scope) {
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

  makeTransform (): Node {
    return Node.objectExpression([
      Node.property(Node.identifier('rotate'), Node.arrayExpression(this.transformStack.rotate.slice(0))),
      Node.property(Node.identifier('translate'), Node.arrayExpression(this.transformStack.translate.slice(0)))
    ])
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

  enterScope (scope: scope) {
    this.stack.push(scope)
  }

  closeScope (): scope {
    return this.stack.pop()
  }

  param
  (command: Node): void {
    var options = this.generateOptionsObject(command)

    // Params also need to have their identifier included as one of their
    // options.
    if (command.id) {
      options.properties.push(
        Node.property(
          Node.identifier('identifier'),
          Node.literal(command.id.name)
        )
      )
    }

    var call = Node.callExpression(
      'param',
      [options]
    )

    var entity = Interpreter.entity(command)
    if (command.id) {
      Object.defineProperty(command.id, 'referenceType', { value: 'param' })
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
  }

  /** Push an identifier onto the top identifier array*/
  pushId (id: Node) {
    this.top().identifiers.push(id)
  }

  top () {
    return this.stack[this.stack.length - 1]
  }

  rotate (command: Node): void {
    var options = this.generateOptionsObject(command)

    this.transformStack.rotate.push(options)
    this.compileNode(command.body)
    this.transformStack.rotate.pop()
  }

  translate (command: Node): void {
    var options = this.generateOptionsObject(command)

    this.transformStack.translate.push(options)
    this.compileNode(command.body)
    this.transformStack.translate.pop()
  }

  /* Walk an expression and make identifiers that reference params gettable. */
  walkExpression (expr: Node): Node {
    var stack = this.top().expression
    stack.push(expr)

    switch (expr.type) {
      case 'ArrayExpression':
      for (let i = 0; i < expr.elements.length; i++) {
        expr.elements[i] = this.walkExpression(expr.elements[i])
      }
      return stack.pop()

      case 'ArrowFunctionExpression':
      this.compileNode(expr)
      return stack.pop()

      case 'AssignmentExpression':
      expr.right = this.walkExpression(expr.right)
      return stack.pop()

      case 'BinaryExpression':
      expr.left = this.walkExpression(expr.left)
      expr.right = this.walkExpression(expr.right)
      return stack.pop()

      case 'CallExpression':
      Object.defineProperty(
        stack[0],
        'wrapInFunction',
        { value: true }
      )
      for (let i = 0; i < expr.arguments.length; i++) {
        expr.arguments[i] = this.walkExpression(expr.arguments[i])
      }
      expr.callee = this.walkExpression(expr.callee)
      return stack.pop()

      case 'ConditionalExpression':
      expr.test = this.walkExpression(expr.test)
      expr.consequent = this.walkExpression(expr.consequent)
      expr.alternate = this.walkExpression(expr.alternate)
      return stack.pop()

      case 'Identifier':
      let id = this.findIdentifier(expr.name)
      if (id) {
        if (id.referenceType === 'param' && this.makeGettable) {
          stack.pop()
          stack.push(Interpreter.makeIdentifierGettable(expr))
          Object.defineProperty(
            stack[0],
            'wrapInFunction',
            { value: true }
          )
        } else if (id.referenceType === 'component' ||
                   id.referenceType === 'function' ||
                   id.referenceType === 'geometry') {
          if (this.functionWrap) {
            Object.defineProperty(
              stack[0],
              'wrapInFunction',
              { value: true }
            )
          }
        }
        return stack.pop()
      }
      return stack.pop()

      case 'Literal':
      return stack.pop()

      case 'MemberExpression':
      expr.object = this.walkExpression(expr.object)
      expr.property = this.walkExpression(expr.property)
      return stack.pop()

      case 'UnaryExpression':
      expr.argument = this.walkExpression(expr.argument)
      return stack.pop()

      default:
      return stack.pop()
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

  static makeTransformProperty (transform: Transform): Node {
    var object = Node.objectExpression([])

    if (transform.rotate.length) {
      object.properties.push(
        Node.property(
          Node.identifier('rotate'),
          Node.arrayExpression(transform.rotate.slice(0))
        )
      )
    }

    if (transform.translate.length) {
      object.properties.push(
        Node.property(
          Node.identifier('translate'),
          Node.arrayExpression(transform.translate.slice(0))
        )
      )
    }

    return Node.property(Node.identifier('transform'), object)
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
