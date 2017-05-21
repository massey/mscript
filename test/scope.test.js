const Interpreter = require('../dist/interpreter.js').default

const i = new Interpreter()

test('context.length should be 0', () => {
  expect(i.context.length).toBe(0);
})

test('getCurrentContext() should be \'param\'', () => {
  i.openScope('param')
  expect(i.getCurrentContext()).toBe('param')
  expect(i.stack.length).toBe(1);
})
