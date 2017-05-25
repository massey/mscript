const path        = require('path')
const fs          = require('fs')
const mscriptAST  = require('../dist/mscript.js').interpret
const Interpreter = require('../dist/interpreter.js').default
const Node        = require('../dist/node.js').default
const parse       = require('acorn').parse

/* Here we instantiate a new Interpreter and check it's initial state, run a
 * few methods to see how the state changes. */
const i = new Interpreter()

describe('interpreter state and some member methods', () => {
  beforeAll(() => {
    i.openScope('topLevel')
  })

  test('context.length should be 1', () => {
    expect(i.context.length).toBe(1);
  })

  test('getCurrentContext() should be \'topLevel\'', () => {
    expect(i.getCurrentContext()).toBe('topLevel')
  })

  test('stack.length should be 1', () => {
    expect(i.stack.length).toBe(1);
  })
})

describe('interpreter static methods', () => {
  test('makeIdentifierGettable', () => {
    let id = Node.identifier('test')
    let gettable = Interpreter.makeIdentifierGettable(id)

    expect(gettable.type).toBe('CallExpression')
    expect(gettable.callee.type).toBe('MemberExpression')
    expect(gettable.callee.property.name).toBe('get')
  })
})

/* Here we instatiate with a simple AST and run compile. Check the output
 * against the expected AST. */

const input   = fs.readFileSync(path.resolve(__dirname, './scripts/dead_simple.js'), 'utf-8')
const ast     = parse(input)

const command = ast.body[0]

const ii      = new Interpreter(ast)
const output  = ii.compile()

const inspect = require('util').inspect

describe('new interpreter with dead simple AST - input AST', () => {
  test('list options in command statement with getOptions()', () => {
    let options = ii.getOptions(command)
    expect(options instanceof Array).toBe(true)
    expect(options.length).toBe(2)
    expect(options[0].type).toBe('LabeledStatement')
    expect(options[1].type).toBe('LabeledStatement')
  })
})

describe('new interpreter with simple AST', () => {
  test('output AST should have type \'Program\'', () => {
    expect(output.type).toBe('Program')
  })

  test('output AST should have a body property', () => {
    expect(output.body).toBeTruthy()
  })

  test('output AST.body should be 1', () => {
    expect(output.body.length).toBe(1)
  })

  let vd = output.body[0]

  test('AST.body should have one VaribaleDeclaration', () => {
    expect(vd.type).toBe('VariableDeclaration')
  })

  test('VaribaleDeclaration should contain one declaration', () => {
    expect(vd.declarations.length).toBe(1)
  })

  let decl = vd.declarations[0]

  test('declaration id should be \'width\'', () => {
    expect(decl.id.name).toBe('width')
  })

  test('declaration should have init', () => {
    expect(decl.init).toBeTruthy()
  })

  test('declaration init should be a CallExpression', () => {
    expect(decl.init.type).toBe('CallExpression')
  })

  let ce = decl.init

  test('CallExpression callee should be \'param\'', () => {
    expect(ce.callee.name).toBe('param')
  })

  test('CallExpression should have two arguments', () => {
    expect(ce.arguments.length).toBe(2)
    expect(ce.arguments[0].type).toBe('Identifier')
    expect(ce.arguments[1].type).toBe('ObjectExpression')
  })

  let oe = ce.arguments[1]

  test('ObjectExpression should have three properties', () => {
    expect(oe.properties.length).toBe(3)
    expect(oe.properties[0].type).toBe('Property')
    expect(oe.properties[1].type).toBe('Property')
    expect(oe.properties[2].type).toBe('Property')
  })

  test('first ObjectExpression property should have key \'type\' and be a string literal', () => {
    expect(oe.properties[0].key.name).toBe('type')
    expect(oe.properties[0].value.type).toBe('Literal')
    expect(oe.properties[0].value.value).toBe('number')
  })

  test('second ObjectExpression property should have key \'value \' and be a number literal', () => {
    expect(oe.properties[1].key.name).toBe('value')
    expect(oe.properties[1].value.type).toBe('Literal')
    expect(oe.properties[1].value.value).toBe(1000)
  })
})
