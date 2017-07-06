import * as acorn from 'acorn'
import Interpreter from './interpreter'
import * as esotope from 'esotope'
import Node from './node'
import { SavedData } from './types/massive'

export function interpret
(input: string, options: {savedData?: SavedData, parent?: any}): Node {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node)

  return  i.compile()
}

export function transpile (input: string, options: {savedData?: SavedData, parent?: any}): Node {
  let ast = acorn.parse(input)
  let i   = new Interpreter(ast as Node)

  return i.compile()
}

export function generate (ast: Node): string {
  return esotope.generate(ast, {
    semicolons: false
  })
}

export { Node }
