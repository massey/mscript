const path        = require('path')
const fs          = require('fs')
const Interpreter = require('../dist/interpreter.js').default
const parse       = require('acorn').parse

/* Here we instantiate a new Interpreter and check it's initial state, run a
 * few methods to see how the state changes. */
const i = new Interpreter()

describe('interpreter state and methods', () => {
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

  test('startNode()', () => {
    let node = i.startNode('Program')
    expect(node).toEqual({type: 'Program'});
  })
})

/* Here we instatiate with a simple AST and run compile. Check the output
 * the output against the expected AST. */

const simpleInput = fs.readFileSync(path.resolve(__dirname, 'param.js'), 'utf-8')
const simpleAST   = parse(simpleInput)

const ii          = new Interpreter(simpleAST)
const output      = ii.compile()

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

  test('first node in AST.body should have type \'VariableDeclaration\'', () => {
    expect(output.body[0].type).toBe('VariableDeclaration')
  })

  test('first node in AST.body should have declarations property and array of length 1', () => {
    let declarations = output.body[0].declarations
    expect(declarations).toBeTruthy()
    expect(declarations instanceof Array).toBeTruthy()
    expect(declarations.length).toBe(1)
  })
})
