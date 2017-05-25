import * as acorn from 'acorn'
import Interpreter from './interpreter'
import * as astring from 'astring/src/astring'
import Node from './node'

export default function transpile (input: string): string {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node)

  return astring.generate(i.compile(), {
    format: {
      semicolons: false
    }
  })
}
