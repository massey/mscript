import * as acorn from 'acorn'
import Interpreter from './interpreter'
import * as astring from 'astring/src/astring'
import Node from './node'
import { SavedData } from './types/massive'

export function transpile (input: string, savedData?: SavedData): string {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node, savedData)

  return astring.generate(i.compile(), {
    format: {
      semicolons: false
    }
  })
}

export function interpret (input: string, savedData?: SavedData): Node {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node, savedData)

  return  i.compile()
}
