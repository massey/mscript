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

export function parse (input: string): Node {
  return acorn.parse(input) as Node
}

export function compile (ast: Node): Node {
  let i = new Interpreter(ast)
  return i.compile()
}

// To be deprecated in favour of compile
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
    } else if (callback){
      callback(node)
    }

    if (typeof node === 'object' && node !== null) {
      for (let key in node) {
        if (typeof node[key] === 'object' && node !== null) traverse(node[key], callback)
      }
    }
  }
}

// Only traverse nodes that have a 'body' property.
export function shallowBodyTraverse (node: any, callback: any): void {
  if (node instanceof Array) {
    node.forEach(_node => {
      shallowBodyTraverse(_node, callback)
    })
  } else {
    if (callback instanceof Array) {
      callback.forEach(_call => {
        _call(node)
      })
    } else if (callback){
      callback(node)
    }

    if (typeof node === 'object' && node !== null && node.body) {
      shallowBodyTraverse(node.body, callback)
    }
  }
}

export { Node }
