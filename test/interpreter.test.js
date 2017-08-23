const path        = require('path')
const fs          = require('fs')
const mscriptAST  = require('../dist/mscript.js').interpret
const Interpreter = require('../dist/interpreter.js').default
const Node        = require('../dist/node.js').default
const parse       = require('acorn').parse
const helpers     = require('./helpers.js')
const esotope = require('esotope')

/* Here we instantiate a new Interpreter and check it's initial state, run a
 * few methods to see how the state changes. */
const i = new Interpreter()

describe('Interpreter state and some member methods', () => {
  test('stack length should be 1', () => {
    expect(i.stack.length).toBe(1);
  })

  // test('contextStack length should be 1', () => {
  //   expect(i.contextStack.length).toBe(1);
  // })
})

describe('Interpreter static methods', () => {
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

const input   = fs.readFileSync(path.resolve(__dirname, './scripts/dead_simple.ms'), 'utf-8')
const ast     = parse(input)

const command = JSON.parse(JSON.stringify(ast.body[0]))

const ii      = new Interpreter(ast)
const output  = ii.compile()

const inspect = require('util').inspect

describe('new interpreter with dead simple AST - input AST', () => {
  test('generateOptionsObject()', () => {
    let options = ii.generateOptionsObject(command)
    expect(options instanceof Node).toBe(true)
    expect(options.type).toBe('ObjectExpression')
    expect(options.properties.length).toBe(3)
  })
})

describe('new interpreter with simple AST', () => {
  test('output AST should have type \'Program\'', () => {
    expect(output.type).toBe('Program')
  })

  test('output AST should have a body property', () => {
    expect(output.body).toBeTruthy()
  })

  test('output AST.body should be 2', () => {
    expect(output.body.length).toBe(2)
  })

  let vd = output.body[0]

  test('first node in AST.body should be a VaribaleDeclaration', () => {
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

  test('CallExpression should have one argument', () => {
    expect(ce.arguments.length).toBe(1)
    expect(ce.arguments[0].type).toBe('ObjectExpression')
  })

  let oe = ce.arguments[0]

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

describe('Box Command', () => {
  test('should compile to the expected javascript', () => {
    let script         = fs.readFileSync(path.resolve(__dirname, './scripts/box.ms'), 'utf-8')
    let ast            = parse(script)
    let expectedScript = fs.readFileSync(path.resolve(__dirname, './scripts/box.js'), 'utf-8')
    let expectedAST    = parse(expectedScript)

    let interpreter = new Interpreter(ast)
    let interpretedAST = interpreter.compile()

    expect(helpers.stripLocations(interpretedAST))
      .toEqual(helpers.stripLocations(expectedAST))
  })
})

describe('Function declaration', () => {
  test('should compile to the expected javascript', () => {
    let script         = fs.readFileSync(path.resolve(__dirname, './scripts/function-declaration.ms'), 'utf-8')
    let ast            = parse(script)
    let expectedScript = fs.readFileSync(path.resolve(__dirname, './scripts/function-declaration.js'), 'utf-8')
    let expectedAST    = parse(expectedScript)

    let interpreter = new Interpreter(ast)
    let interpretedAST = interpreter.compile()

    expect(helpers.stripLocations(interpretedAST)).toEqual(helpers.stripLocations(expectedAST))
  })
})

function astEquality (ms, js) {
  let input    = fs.readFileSync(path.resolve(__dirname, ms), 'utf-8')
  let ast      = mscriptAST(input)
  let expected = fs.readFileSync(path.resolve(__dirname, js), 'utf-8')
  let expAST   = parse(expected)

  expect(helpers.stripLocations(ast)).toEqual(helpers.stripLocations(expAST))
}

describe('Interpreter', () => {
  describe('should generate the expected AST from', () => {
    test('a simple mscript', () => {
      astEquality('./scripts/simple.ms', './scripts/simple.js')
    })

    test('a script with some member expressions', () => {
        let input    = fs.readFileSync(path.resolve(__dirname, './scripts/members.ms'), 'utf-8')
        let ast      = mscriptAST(input)
        let expected = fs.readFileSync(path.resolve(__dirname, './scripts/members.js'), 'utf-8')
        let expAST   = parse(expected)

        expect(helpers.stripLocations(ast)).toEqual(helpers.stripLocations(expAST))
    })

    test('a script with some conditionals', () => {
      astEquality('./scripts/conditionals.ms', './scripts/conditionals.js')
    })

    test('a script with some brackets ', () => {
      astEquality('./scripts/brackets.ms', './scripts/brackets.js')
    })

    test('a script with an array function', () => {
      astEquality('./scripts/array-function-0.ms', './scripts/array-function-0.js')
    })

    test('a script with an array function 1', () => {
      astEquality('./scripts/array-function-1.ms', './scripts/array-function-1.js')
    })

    test('a script with nested components', () => {
      astEquality('./scripts/nested-components.ms', './scripts/nested-components.js')
    })

    // test('a script with a group', () => {
    //   astEquality('./scripts/group.ms', './scripts/group.js')
    // })

    test('a script with a group', () => {
      let input    = fs.readFileSync(path.resolve(__dirname, './scripts/group.ms'), 'utf-8')
      let ast      = mscriptAST(input)
      let expected = fs.readFileSync(path.resolve(__dirname, './scripts/group.js'), 'utf-8')
      let expAST   = parse(expected)

      // console.log(inspect(ast, { depth: null, colors: true }))
      console.log('int', esotope.generate(ast))
      console.log(esotope.generate(expAST))

      expect(helpers.stripLocations(ast)).toEqual(helpers.stripLocations(expAST))
    })

    test('a script with a tag', () => {
      let input    = fs.readFileSync(path.resolve(__dirname, './scripts/tag.ms'), 'utf-8')
      let ast      = mscriptAST(input)
      let expAST   = Node.program()
      expAST.body.push({ tag: 'product', code: 'test', id: 'carcas' })

      expect(helpers.stripLocations(ast)).toEqual(helpers.stripLocations(expAST))
    })

    test('an example script', () => {
      astEquality('./scripts/example.ms', './scripts/example.js')
    })

    // test('an example script', () => {
    //   let input    = fs.readFileSync(path.resolve(__dirname, './scripts/example.ms'), 'utf-8')
    //   let ast      = mscriptAST(input)
    //   let expected = fs.readFileSync(path.resolve(__dirname, './scripts/example.js'), 'utf-8')
    //   let expAST   = parse(expected)
    //
    //   // console.log(inspect(ast, { depth: null, colors: true }))
    //   console.log(esotope.generate(ast))
    //   // console.log(esotope.generate(expAST))
    //
    //   expect(helpers.stripLocations(ast)).toEqual(helpers.stripLocations(expAST))
    // })
  })
})
