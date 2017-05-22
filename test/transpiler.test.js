const fs          = require('fs')
const path        = require('path')
const mscript     = require('../dist/transpiler').default
const simpleInput = fs.readFileSync(path.resolve(__dirname, 'param.js'), 'utf-8')
const output      = mscript(simpleInput)

console.log(output)

test('mscript output is truthy', () => {
  expect(output).toBeTruthy()
})
