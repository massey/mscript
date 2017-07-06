const assert      = require('assert')
const fs          = require('fs')
const path        = require('path')

const acorn       = require('acorn')
const mscript     = require('../dist/mscript').transpile
const mscriptAST  = require('../dist/mscript').interpret
const helpers     = require('./helpers')

const deadSimpleInput  = fs.readFileSync(path.resolve(__dirname, './scripts/dead_simple.js'), 'utf-8')
const deadSimpleOutput = mscript(deadSimpleInput)

test('mscript output is truthy', () => {
  expect(deadSimpleOutput).toBeTruthy()
})

describe('Try some AST equality testing', () => {

  test('a dead simple mscript', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/dead_simple.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/dead_simple.ast.js')

    expect(ast).toEqual(expAST)
    expect(mscript(input))
  })

  test('a simple mscript', () => {
    let input    = fs.readFileSync(path.resolve(__dirname, './scripts/simple.ms'), 'utf-8')
    let ast      = mscriptAST(input)
    let expected = acorn.parse(fs.readFileSync(path.resolve(__dirname, './scripts/simple.js'), 'utf-8'))

    expect(ast).toEqual(helpers.stripLocations(expected))
    expect(mscript(input))
  })

  test('a script with some member expressions', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/members.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/members.ast.js')

    const inspect = require('util').inspect

    expect(ast).toEqual(expAST)
    expect(mscript(input))
  })

  test('a script with some conditionals', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/conditionals.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/conditionals.ast.js')

    const inspect = require('util').inspect

    expect(ast).toEqual(expAST)
    expect(mscript(input))
  })

  test('a script with some brackets ', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/brackets.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/brackets.ast.js')

    expect(ast).toEqual(expAST)
    expect(mscript(input))
  })

  test('a script with a group', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/group.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/group.ast.js')

    expect(ast).toEqual(expAST)
    expect(mscript(input))
  })

  test('a script with nested params in a group', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/nested.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/nested.ast.js')

    expect(ast).toEqual(expAST)
    expect(mscript(input))
  })

  test('a script with some attributes', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/attributes.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/attributes.ast.js')

    expect(ast).toEqual(expAST)
    expect(mscript(input))
  })

  test('a script with a meta command', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/meta.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/meta.ast.js')

    expect(ast).toEqual(expAST)
    expect(mscript(input))
  })
})

describe('component command', () => {
  test('component that is a product', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/component-product.js'), 'utf-8')
    let ast    = mscriptAST(input)
    console.log(ast)
    let expAST = require('./ast/component-product.ast.js')

    expect(ast).toEqual(expAST)
  })
})
