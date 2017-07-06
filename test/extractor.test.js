const extractor = require('../dist/extractor.js')

const fs          = require('fs')
const path        = require('path')

const acorn       = require('acorn')
const mscript     = require('../dist/mscript').transpile
const mscriptAST  = require('../dist/mscript').interpret
const helpers     = require('./helpers')

describe('Extractor', () => {
  test('should extract parent params', () => {
    let parent = {
      params: [
        {
          name: 'radius'
        },
        {
          name: 'clip'
        }
      ]
    }

    let expected = acorn.parse(fs.readFileSync(path.resolve(__dirname, './scripts/extractor-parent-params.js'), 'utf-8'))
    let script = extractor.parentParams(parent.params)
    let test = acorn.parse(script)

    expect(helpers.stripLocations(test)).toEqual(helpers.stripLocations(expected))
  })
})
