const util = require('util')
const parse = require('acorn').parse

module.exports = function (string) {
  console.log(util.inspect(parse(string), {depth: null, colors: true }))
}
