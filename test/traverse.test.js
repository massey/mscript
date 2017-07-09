const mscript = require('../dist/mscript')

const tree = {
  levelOne: {
    LevelTwo: [
      0, 1, 2, 3
    ]
  }
}

describe('MScript.traverse', () => {
  test('should not throw error', () => {
    expect(mscript.traverse(tree))
  })
})
