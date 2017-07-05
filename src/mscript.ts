import * as acorn from 'acorn'
import Interpreter from './interpreter'
import * as esotope from 'esotope'
import Node from './node'
import { SavedData } from './types/massive'

export function transpile
(input: string, options: {savedData?: SavedData, parent?: any}): string {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node, options)

  return esotope.generate(i.compile(), {
    format: {
      semicolons: false
    }
  })
}

export function interpret
(input: string, options: {savedData?: SavedData, parent?: any}): Node {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node, options)

  return  i.compile()
}

export const mscript = {
  transpile (input: string, options: {savedData?: SavedData, parent?: any}): Node {
    let ast = acorn.parse(input)
    let i   = new Interpreter(ast as Node, options)

    return i.compile()
  },

  generate (ast: Node): string {
    return esotope.generate(ast)
  }
}
