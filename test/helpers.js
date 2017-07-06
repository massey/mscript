/**
Traverse an object and remove 'start' and 'end' properties
*/
module.exports = {
  stripLocations: function stripLocations (ast) {
    if (ast instanceof Array) {
      ast.forEach(el => stripLocations(el))
    } else if (typeof ast === 'object' && ast !== null) {
      for (let key in ast) {
        if (key === 'start' || key === 'end') {
          delete ast[key]
        } else if (typeof ast[key] === 'object' && ast[key] !== null) {
          stripLocations(ast[key])
        }
      }
    }

    return ast
  }
}
