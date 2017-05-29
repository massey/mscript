const assert      = require('assert')
const fs          = require('fs')
const path        = require('path')

const mscript     = require('../dist/mscript').transpile
const mscriptAST  = require('../dist/mscript').interpret

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
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/simple.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/simple.ast.js')

    expect(ast).toEqual(expAST)
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

  test('a script transpiled with some saved data and a parent', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/options.js'), 'utf-8')
    let expAST = require('./ast/options.ast.js')
    let options = {
      data: {
        params: [
          {
            name: 'width',
            value: 200
          },
          {
            name: 'depth',
            value: 'bye'
          },
          {
            name: 'height',
            accessor: 'bar'
          }
        ]
      },
      parent: {
        params: [
          {
            name: 'radius'
          }
        ]
      }
    }

    let ast = mscriptAST(input, options)

    expect(ast).toEqual(expAST)
    expect(mscript(input, options))
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
})
