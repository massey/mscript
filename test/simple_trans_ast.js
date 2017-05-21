export default {
  type: 'Program',
  start: 0,
  end: 67,
  body: {
    type: 'VariableDeclaration',
    start: 0,
    end: 67,
    declarations: [
      {
        type: 'VariableDeclarator',
        start: 4,
        end: 67,
        id: { type: 'Identifier', start: 4, end: 9, name: 'width' },
        init: {
          type: 'CallExpression',
          start: 12,
          end: 67,
          callee: { type: 'Identifier', start: 12, end: 21, name: 'component' },
          arguments: [
            {
              type: 'ObjectExpression',
              start: 22,
              end: 66,
              properties: [
                {
                  type: 'Property',
                  start: 23,
                  end: 36,
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: { type: 'Identifier', start: 23, end: 27, name: 'name' },
                  value: {
                    type: 'Literal',
                    start: 29,
                    end: 36,
                    value: 'width',
                    raw: '\'width\''
                  },
                  kind: 'init'
                },
                {
                 type: 'Property',
                 start: 38,
                 end: 52,
                 method: false,
                 shorthand: false,
                 computed: false,
                 key: { type: 'Identifier', start: 38, end: 42, name: 'type' },
                 value: {
                    type: 'Literal',
                    start: 44,
                    end: 52,
                    value: 'number',
                    raw: '\'number\''
                 },
                 kind: 'init'
                },
                {
                  type: 'Property',
                  start: 54,
                  end: 65,
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: { type: 'Identifier', start: 54, end: 59, name: 'value' },
                  value: { type: 'Literal', start: 61, end: 65, value: 1000, raw: '1000' },
                  kind: 'init'
                }
              ]
            }
          ]
        }
      }
    ],
    kind: 'var'
  },
  sourceType: 'script'
}
