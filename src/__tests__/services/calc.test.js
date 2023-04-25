const {Calc, eventTypes, keyValues} = require("../../services/calc/index.mjs");

let calc;

beforeEach(() => {
  calc = new Calc()
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

describe('Long scenarios', () => {
  test('test_16', () => {
    const expr = '7 - 6 = ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(-5)
  })

  test('test_17', () => {
    const expr = '45 + 6 = = - * - ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(0)
  })

  test('test4', () => {
    const expr = '1.56 + 5 - 3 ='
    calc.evalExpr(expr)
    calc.putKey('Delete')
    expect(Number((calc.output).toFixed(5))).toEqual(3.56)
  })

  test('test_18', () => {
    const expr = '4 - 2 = 3 ='  // Last op and right remain
    calc.evalExpr(expr)
    expect(calc.output).toEqual(1)
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
})

describe('Long scenarios (check expressions)', () => {
  test('[]1.56 + 5 - 3 = <DEL> 453 <DEL> * - 4 =]', () => {
    const expr = '1.56' //'1.56 + 5 - 3 = <DEL> 453 <DEL> * - 4 ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(1.56)
    expect(calc.expr).toEqual('')
    calc.putKey(keyValues.KEY_PLUS)
    expect(calc.output).toEqual(1.56)
    expect(calc.expr).toEqual('1,56 +')
    calc.putKey('5')
    expect(calc.output).toEqual(5)
    expect(calc.expr).toEqual('1,56 +')
    calc.putKey(keyValues.KEY_MINUS)
    expect(calc.output).toEqual(6.56)
    expect(calc.expr).toEqual('6,56 -')
    calc.putKey('3')
    expect(calc.output).toEqual(3)
    expect(calc.expr).toEqual('6,56 -')
    calc.putKey(keyValues.KEY_ENTER)
    expect(calc.output).toEqual(3.56)
    expect(calc.expr).toEqual('6,56 - 3 =')
    calc.putKey(keyValues.KEY_DELETE)
    expect(calc.output).toEqual(3.56)
    expect(calc.expr).toEqual('')
    calc.evalExpr('453')
    expect(calc.output).toEqual(453)
    expect(calc.expr).toEqual('')
    calc.putKey(keyValues.KEY_DELETE)
    expect(calc.output).toEqual(45)
    expect(calc.expr).toEqual('')
    calc.putKey(keyValues.KEY_MUL)
    expect(calc.output).toEqual(45)
    expect(calc.expr).toEqual('45 *')
    calc.putKey(keyValues.KEY_MINUS)
    expect(calc.output).toEqual(45)
    expect(calc.expr).toEqual('45 -')
    calc.evalExpr('4 =')
    expect(calc.output).toEqual(41)
    expect(calc.expr).toEqual('45 - 4 =')
  })

  test('New OP and LEFT after = [5 + 3 = 2 - = =]', () => {
    const expr = '5 + 3 =' //'5 + 3 = 2 - = ='
    calc.evalExpr(expr)
    expect(calc.output).toEqual(8)
    expect(calc.expr).toEqual('5 + 3 =')
    calc.putKey('2')
    expect(calc.output).toEqual(2)
    expect(calc.expr).toEqual('')
    calc.putKey('-')
    expect(calc.output).toEqual(2)
    expect(calc.expr).toEqual('2 -')
    calc.putKey('=')
    expect(calc.output).toEqual(0)
    expect(calc.expr).toEqual('2 - 2 =')
    calc.putKey('=')
    expect(calc.output).toEqual(-2)
    expect(calc.expr).toEqual('0 - 2 =')
  })

  test('DEL after OP [26 - <DEL> <DEL> <DEL> * 5 - =]', () => {
    const expr = '26' //'26 - Del Del ...'
    calc.evalExpr(expr)
    expect(calc.output).toEqual(26)
    expect(calc.expr).toEqual('')
    calc.putKey('-')
    expect(calc.output).toEqual(26)
    expect(calc.expr).toEqual('26 -')
    calc.putKey('Delete')
    expect(calc.output).toEqual(26)
    expect(calc.expr).toEqual('26 -')
    calc.putKey('Delete')
    expect(calc.output).toEqual(26)
    expect(calc.expr).toEqual('26 -')
    calc.putKey('Delete')
    expect(calc.output).toEqual(26)
    expect(calc.expr).toEqual('26 -')
    calc.putKey('+')
    expect(calc.output).toEqual(26)
    expect(calc.expr).toEqual('26 +')
    calc.putKey('5')
    expect(calc.output).toEqual(5)
    expect(calc.expr).toEqual('26 +')
    calc.putKey('-')
    expect(calc.output).toEqual(31)
    expect(calc.expr).toEqual('31 -')
    calc.putKey('=')
    expect(calc.output).toEqual(0)
    expect(calc.expr).toEqual('31 - 31 =')
  })
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