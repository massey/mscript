const assert = require('assert')

function treeMatch(act, exp) {

  for (let key in act) {

    var curAct = act[key], curExp = exp[key]

    if (!exp.hasOwnProperty(key) && key !== 'start' && key !== 'end') {
      console.log(act)
      console.log(exp)
      throw new Error(`expected doesn't have key ${key}`)
    }

    if (curAct instanceof Array) {
      if (curAct.length !== curExp.length) {
        throw new Error(`array length mismatch.  Received length is ${curAct.length} expected ${curExp.length}`)
      }

      for (let i = 0; i < curAct.length; i++) {
        treeMatch(curAct[i], curExp[i])
      }
    } else if (curAct instanceof Object) {
      treeMatch(curAct, curExp)
    }
  }

  return true
}

expect.extend({
  treeMatch: function (received, argument) {
    let pass = treeMatch(received, argument)
    if (pass) {
      return {
        message: () => (
          'expected objects not to be equal'
        ),
        pass: true
      }
    } else {
      return {
        message: () => (
          'expected objects to be equal'
        ),
        pass: false
      }
    }
  }
})
