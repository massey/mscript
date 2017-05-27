const inspect = require('util').inspect
const fs = require('fs')
const path = require('path')
const interpret = require('./dist/mscript').interpret
const mscript = require('./dist/mscript').transpile

const parse   = require('acorn').parse
const astring = require('astring')
const eso = require('esotope')

const input  = fs.readFileSync(path.resolve(__dirname, './test/scripts/nested.js'), 'utf-8')
const expAST = require('./test/ast/members.ast.js')

// console.log(inspect(expAST, {depth: null}))
// console.log(inspect(parse(input), {depth: null}))
// console.log(inspect(interpret(input), {depth: null}))
console.log(eso.generate(expAST))
// console.log(mscript(input))
