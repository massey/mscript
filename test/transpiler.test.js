const assert      = require('assert')
const fs          = require('fs')
const path        = require('path')

const mscript     = require('../dist/mscript').transpile
const mscriptAST  = require('../dist/mscript').interpret

/* Custom matchers*/
require('./matchers.js')

const deadSimpleInput  = fs.readFileSync(path.resolve(__dirname, './scripts/dead_simple.js'), 'utf-8')
const deadSimpleOutput = mscript(deadSimpleInput)

test('mscript output is truthy', () => {
  expect(deadSimpleOutput).toBeTruthy()
})

describe('Try some AST equality testing', () => {

  test('a simple mscript', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/simple.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/simple.ast.js')

    expect(ast).treeMatch(expAST)
  })

  test('a script with some member expressions', () => {
    let input  = fs.readFileSync(path.resolve(__dirname, './scripts/members.js'), 'utf-8')
    let ast    = mscriptAST(input)
    let expAST = require('./ast/members.ast.js')

    expect(ast).treeMatch(expAST)
  })
})
