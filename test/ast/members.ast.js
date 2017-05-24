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
    },
    {
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'depth'},
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
                    value: { type: 'Literal', value: 600}
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'name' },
                    value: { type: 'Literal', value: 'depth'}
                  },
                ]
              }
            ]
          }
        }
      ]
    },
    {
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'height'},
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
                    value: { type: 'Literal', value: 'depth'}
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'kickHeight'},
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
                    value: { type: 'Literal', value: 100}
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'name' },
                    value: { type: 'Literal', value: 'kickHeight'}
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'base'},
          init: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'component'},
            arguments: [
              {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'A' },
                    value: {
                      type: 'ArrowFunctionExpression',
                      params: [],
                      body: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: { type: 'Identifier', name: 'width'},
                            property: { type: 'Identifier', name: 'get'}
                          },
                          arguments: []
                        },
                        operator: '+',
                        right: { type: 'Literal', start: 125, end: 128, value: 100, raw: '100' },
                      },
                      id: null,
                      generator: false,
                      expression: true
                    }
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'B' },
                    value: {
                      type: 'ArrowFunctionExpression',
                      params: [],
                      body: {
                        type: 'CallExpression',
                        callee: {
                          type: 'MemberExpression',
                          object: { type: 'Identifier', name: 'depth' },
                           property: { type: 'Identifier', name: 'get' }
                        },
                        arguments: []
                      },
                      id: null,
                      generator: false,
                      expression: true
                    }
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'material' },
                    value: { type: 'Literal', value: '01.002'}
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'name' },
                    value: { type: 'Literal', value: 'base'}
                  },
                ]
              }
            ]
          }
        }
      ]
    },
    {
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'back'},
          init: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'component'},
            arguments: [
              {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'A' },
                    value: {
                      type: 'ArrowFunctionExpression',
                      params: [],
                      body: {
                        type: 'CallExpression',
                        callee: {
                          type: 'MemberExpression',
                          object: { type: 'Identifier', name: 'base'},
                          property: { type: 'Identifier', name: 'A'}
                        },
                        arguments: []
                      },
                      id: null,
                      generator: false,
                      expression: true
                    }
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'B' },
                    value: {
                      type: 'ArrowFunctionExpression',
                      params: [],
                      body: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: { type: 'Identifier', name: 'base'},
                            property: { type: 'Identifier', name: 'A'}
                          },
                          arguments: []
                        },
                        operator: '-',
                        right: {
                          type: 'MemberExpression',
                          object: { type: 'Identifier', name: 'base'},
                          property: { type: 'Identifier', name: 'thickness'}
                        },
                      },
                      id: null,
                      generator: false,
                      expression: true
                    }
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'material' },
                    value: { type: 'Literal', value: '01.002'}
                  },
                  {
                    type: 'Property',
                    key: { type: 'Identifier', name: 'name' },
                    value: { type: 'Literal', value: 'base'}
                  },
                ]
              }
            ]
          }
        }
      ]
    }
  ]
}
