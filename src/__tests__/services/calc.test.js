const Calc = require('../../services/calc')

let calc;

const putSting = (c, s) => {
  [...s].forEach((key) => c.putKey(key))
}

beforeEach(() => {
  calc = new Calc.Calc()
})

test('test1', () => {
  const expr = '2+3='
  putSting(calc, expr)
  expect(calc.result).toEqual('5')
})

test('test2', () => {
  const expr = '-2+3='
  putSting(calc, expr)
  expect(calc.result).toEqual('1')
})

test('test4', () => {
  const expr = '-2+3+5*4='
  putSting(calc, expr)
  expect(calc.result).toEqual('24')
})
