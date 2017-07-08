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

export function traverse (node: any, callback: any): void {
  if (node instanceof Array) {
    node.forEach(_node => {
      traverse(_node, callback)
    })
  } else {
    if (callback instanceof Array) {
      callback.forEach(_call => {
        _call(node)
      })
    } else {
      callback(node)
    }

    if (typeof node === 'object' && node !== 'null') {
      for (let key in node) {
        if (typeof node === 'object' && node !== 'null') traverse(node, callback)
      }
    }
  }
}

export { Node }
