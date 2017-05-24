module.exports = {
  type: 'Program',
  body: [
    {
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'width'},
          init: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'param'},
            arguments: [
              {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'type' },
                    value: { type: 'Literal', value: 'number'}
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'value' },
                    value: { type: 'Literal', value: 1000}
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'name' },
                    value: { type: 'Literal', value: 'width'}
                  },
                ]
              }
            ]
          }
        }
      ],
      kind: 'var'
    }
  ]
}
