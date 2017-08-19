const assert      = require('assert')
const fs          = require('fs')
const path        = require('path')

const acorn       = require('acorn')
const mscript     = require('../dist/mscript').transpile
const mscriptAST  = require('../dist/mscript').interpret
const helpers     = require('./helpers')

const deadSimpleInput  = fs.readFileSync(path.resolve(__dirname, './scripts/dead_simple.js'), 'utf-8')
const deadSimpleOutput = mscript(deadSimpleInput)

function astEquality (ms, js) {
  let input    = fs.readFileSync(path.resolve(__dirname, ms), 'utf-8')
  let ast      = mscriptAST(input)
  let expected = fs.readFileSync(path.resolve(__dirname, js), 'utf-8')
  let expAST   = acorn.parse(expected)

  expect(ast).toEqual(helpers.stripLocations(expAST))
  expect(mscript(input))
}

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
    astEquality('./scripts/simple.ms', './scripts/simple.js')
  })

  test('a script with some member expressions', () => {
    astEquality('./scripts/members.ms', './scripts/members.js')
  })

  test('a script with some conditionals', () => {
    astEquality('./scripts/conditionals.ms', './scripts/conditionals.js')
  })

  test('a script with some brackets ', () => {
    astEquality('./scripts/brackets.ms', './scripts/brackets.js')
  })

  test('a script with a group', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/group.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/group.ast.js')

    expect(ast).toEqual(expAST)
    expect(mscript(input))
  })

  test('a script with nested params in a group', () => {
    let input    = fs.readFileSync(path.resolve(__dirname, './scripts/nested.ms'), 'utf-8')
    let ast      = mscriptAST(input)
    let expected = fs.readFileSync(path.resolve(__dirname, './scripts/nested.js'), 'utf-8')
    let expAST   = acorn.parse(expected)

    expect(ast).toEqual(helpers.stripLocations(expAST))
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
    let expAST = require('./ast/component-product.ast.js')

    expect(ast).toEqual(expAST)
  })
})
