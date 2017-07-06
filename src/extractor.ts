/**
Extractor analyzes an object and looks for properties that need to be injected
into another script.
*/
import Node from './node'
import * as esotope from 'esotope'

/**
Extract params and expose as varibale in the form:
```
var <param name> = parent.params[n]
```
*/
export function parentParams (params: Array<any>): string {
  let program = Node.program()

  params.forEach((param:any, index: number) => {
    program.body.push(
      Node.variableDeclaration(
        'var',
        [Node.variableDeclarator(
          Node.identifier(param.name),
          Node.memberExpression(
            Node.memberExpression(
              Node.identifier('parent'),
              Node.identifier('params')
            ),
            Node.literal(index),
            true
          )
        )]
      )
    )
  })

  return esotope.generate(program, { semicolons: false })
}
