/* test out the parser. */

const parse   = require('acorn').parse
const inspect = require('util').inspect
const fs      = require('fs')
const path    = require('path')
const resolve = file => path.resolve(__dirname, file)

const input = fs.readFileSync(resolve('./test/base_single.js'), 'utf-8')

const startParse = Date.now()

const ast = parse(input)

console.log(inspect(ast, {depth:null}))

console.log(`Parsed in ${Date.now() - startParse} ms`)

ast.body.forEach(n => {
  console.log(n.type)
})
