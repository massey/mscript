import * as acorn from 'acorn'
import Interpreter from './interpreter'
import * as escodegen from 'escodegen'
import Node from './node'

export default function transpile (input: string): string {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node)

  return escodegen.generate(i.compile(), {
    format: {
      semicolons: false
    }
  })
}
