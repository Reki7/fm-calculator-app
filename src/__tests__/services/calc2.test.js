const Calc = require('../../services/calc2.mjs')
const {eventTypes} = require("../../services/calc2.mjs");

let calc;

beforeEach(() => {
  calc = new Calc.Calc()
})

describe('Integer Calculation', () => {
  test('Simple add', () => {
    const expr = '2 + 3 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(5)
    expect(calc.expr).toEqual(expr)
  })

  test('Add with negative left', () => {
    const expr = '-2 + 3 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(1)
    expect(calc.expr).toEqual(expr)
  })

  test('Expr with negative left', () => {
    const expr = '-2 + 3 + 5 * 4 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(24)
    expect(calc.expr).toEqual('6 * 4 =')
  })

  test('Simple subtraction', () => {
    const expr = '3 - 2 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(1)
    expect(calc.expr).toEqual(expr)
  })

  test('Subtraction with negative left', () => {
    const expr = '-3 - 2 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(-5)
    expect(calc.expr).toEqual(expr)
  })

  test('Simple multiplication', () => {
    const expr = '3 * 2 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(6)
    expect(calc.expr).toEqual(expr)
  })

  test('Subtraction with negative left (int)', () => {
    const expr = '-5 * 4 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(-20)
    expect(calc.expr).toEqual(expr)
  })

  test('Simple division (int)', () => {
    const expr = '6 / 2 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(3)
    expect(calc.expr).toEqual(expr)
  })

  test('Simple division (fract)', () => {
    const expr = '5 / 2 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(2.5)
    expect(calc.expr).toEqual(expr)
  })

  test('Subtraction with negative left (fract)', () => {
    const expr = '-9 / 4 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(-2.25)
    expect(calc.expr).toEqual(expr)
  })
})

test('test4', () => {
  const expr = '1.56 + 5 - 3 ='
  calc.evalExpr(expr)
  calc.putKey('Delete')
  expect(Number((calc.output).toFixed(5))).toEqual(3.56)
})

test('test5', () => {
  const expr = '1.56 + 5 - 3 ='
  calc.evalExpr(expr)
  calc.putKey('Delete')
  calc.evalExpr('453')
  calc.putKey('Delete')
  calc.putKey('*')
  calc.putKey('-')
  calc.evalExpr('4=')
  expect(calc.output).toEqual(41)
})

test('test6', () => {
  const expr = '153'
  calc.evalExpr(expr)
  calc.putKey('Delete')
  calc.putKey('Delete')
  expect(Number((calc.output).toFixed(5))).toEqual(1)
})

test('test7', () => {
  const expr = '153'
  calc.evalExpr(expr)
  calc.putKey('Delete')
  calc.putKey('Delete')
  calc.putKey('Delete')
  expect(Number((calc.output).toFixed(5))).toEqual(0)
})

test('test8', () => {
  const expr = '153'
  calc.evalExpr(expr)
  calc.putKey('Delete')
  calc.putKey('Delete')
  calc.putKey('Delete')
  calc.putKey('Delete')
  expect(Number((calc.output).toFixed(5))).toEqual(0)
})

test('Events', () => {
  let cb_result = null;
  const cb = (payload) => {
    cb_result = payload;
  }
  calc.addListener(eventTypes.EVENT_INPUT, cb)
  const expr = '153'
  calc.evalExpr(expr)
  expect(cb_result).toEqual(expr.at(-1))
  // calc.putKey('Delete')
  // calc.putKey('Delete')
  // calc.putKey('Delete')
  // calc.putKey('Delete')
  // expect(Number((calc.output).toFixed(5))).toEqual(0)
})