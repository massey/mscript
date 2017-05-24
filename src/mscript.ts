import * as acorn from 'acorn'
import Interpreter from './interpreter'
import * as escodegen from 'escodegen'
import Node from './node'

export function transpile (input: string): string {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node)

  return escodegen.generate(i.compile(), {
    format: {
      semicolons: false
    }
  })
}

export function interpret (input: string): Node {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node)

  return  i.compile()
}
