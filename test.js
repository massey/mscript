const inspect = require('util').inspect
const fs = require('fs')
const path = require('path')
const interpret = require('./dist/mscript').interpret
const transpile = require('./dist/mscript').transpile

const input = fs.readFileSync(path.resolve(__dirname, './test/scripts/base_single.js'), 'utf-8')

console.log(transpile(input))
