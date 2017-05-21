interface inputAst {
  type: string
  body: Array<object>;
}

interface node {
  type: string
  [propName: string]: any;
}

export default class Interpreter {
  input: inputAst
  data:  object
  context: Array<string>
  stack: Array<Array<object>>

  constructor (ast: inputAst, data: object) {
    this.input = ast
    this.data  = data

    /* Keeps track of what command we're inside of. */
    this.context = []

    /* Identifiers are kept in nested arrays. */
    this.stack = []
  }

  compile () {
    this.openScope('topLevel')

    let node = this.startNode('Program')

    node.body = []

    this.input.body.forEach((msNode: node) => {
      node.body.push(this.compileNode(msNode))
    })

    return node
  }

  compileNode (msNode: node) {

    switch (msNode.type) {
      case 'CommandStatement': return this.commandStatement(msNode)
      default:
    }
  }

  commandStatement (msNode: node) {

    switch (msNode.name.name) {
      case 'param': return this.param(msNode)
      default:
    }
  }

  getCurrentContext () {
    return this.context[this.context.length - 1]
  }

  getCurrentScope () {
    return this.stack[this.stack.length - 1]
  }

  getOptions (command: node): Array<node> {
    let body: node = command.body.body

    return body.filter((option: node) => {
      return option.type === 'LabeledStatement'
    })
  }

  openScope (context: string) {
    this.context.push(context)
    this.stack.push([])
  }

  closeScope () {
    this.context.pop()
    this.stack.pop()
  }

  identifier (name: string, _instanceof?: string): node {
    let id = {
      type:'Identifier',
      name,
      _instanceof
    }

    this.getCurrentScope().push(id)

    return id
  }

  param (msNode: node) {
    this.openScope('param')

    let node = this.startNode('VariableDeclaration')

    node.declarations = []

    let declarator = this.startNode('VariableDeclarator')
    declarator.id = this.identifier(msNode.id.name, 'param')
    let init = declarator.init = this.startNode('CallExpression')
    init.callee = this.identifier('param')
    init.arguments = []

    let options = this.startNode('ObjectExpression')
    options.properties = []

    this.closeScope()

    return node
  }

  startNode (type: string): node {
    return { type }
  }
}
