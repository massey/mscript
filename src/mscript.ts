import * as acorn from 'acorn'
import Interpreter from './interpreter'
import * as esotope from 'esotope'
import Node from './node'
import { SavedData } from './types/massive'

export function transpile (input: string, savedData?: SavedData): string {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node, savedData)

  return esotope.generate(i.compile(), {
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
