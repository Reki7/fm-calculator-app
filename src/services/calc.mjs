const KEY_PERIOD = '.'
const KEY_PLUS = '+'
const KEY_MINUS = '-'
const KEY_MUL = '*'
const KEY_DIV = '/'
const KEY_DELETE = 'Delete'
const KEY_RESET = 'Escape'

const KEY_TYPE_INPUT = 'input'
const KEY_TYPE_OPERATION = 'operation'
const KEY_TYPE_COMMAND = 'command'
const KEY_TYPE_ENTER = 'enter'

export const keyTypes = {
  KEY_TYPE_INPUT,
  KEY_TYPE_OPERATION,
  KEY_TYPE_COMMAND,
  KEY_TYPE_ENTER
}

const EVENT_INPUT = 'calc_evt_input'
const EVENT_CALC = 'calc_evt_calc'

export const eventTypes = {
  EVENT_INPUT,
  EVENT_CALC
}

export const calc_keys = [
  {
    label: '0',
    value: '0',
    type: KEY_TYPE_INPUT
  },
  {
    label: '1',
    value: '1',
    type: KEY_TYPE_INPUT
  },
  {
    label: '2',
    value: '2',
    type: KEY_TYPE_INPUT
  },
  {
    label: '3',
    value: '3',
    type: KEY_TYPE_INPUT
  },
  {
    label: '4',
    value: '4',
    type: KEY_TYPE_INPUT
  },
  {
    label: '5',
    value: '5',
    type: KEY_TYPE_INPUT
  },
  {
    label: '6',
    value: '6',
    type: KEY_TYPE_INPUT
  },
  {
    label: '7',
    value: '7',
    type: KEY_TYPE_INPUT
  },
  {
    label: '8',
    value: '8',
    type: KEY_TYPE_INPUT
  },
  {
    label: '9',
    value: '9',
    type: KEY_TYPE_INPUT
  },
  {
    label: '.',
    value: KEY_PERIOD,
    type: KEY_TYPE_INPUT
  },
  {
    label: '+',
    value: KEY_PLUS,
    type: KEY_TYPE_OPERATION
  },
  {
    label: '-',
    value: KEY_MINUS,
    type: KEY_TYPE_OPERATION
  },
  {
    label: '/',
    value: KEY_DIV,
    type: KEY_TYPE_OPERATION
  },
  {
    label: 'x',
    value: KEY_MUL,
    type: KEY_TYPE_OPERATION
  },
  {
    label: 'Del',
    value: KEY_DELETE,
    type: KEY_TYPE_COMMAND,
    aliases: ['Backspace']
  },
  {
    label: 'Reset',
    value: KEY_RESET,
    type: KEY_TYPE_COMMAND
  },
  {
    label: '=',
    value: 'Enter',
    type: KEY_TYPE_ENTER
  },
]

export let acceptedKeys = {}


// const MAX_NUMBER = 1.0e15
// const MAX_DECIMAL = 10
const MAX_FRACTIONAL_LENGTH = 10;
const MAX_NORMAL = 9999999999;

const getNavigatorLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
  }
}

function getDecimalSeparator(locale) {
  const numberWithDecimalSeparator = 1.1;
  return Intl.NumberFormat(locale)
    .formatToParts(numberWithDecimalSeparator)
    .find(part => part.type === 'decimal')
    .value;
}

/*
properties:
- input: String
- value1: Float
- value2: Float
- operation: Enum(OP_PLUS, OP_MINUS, OP_MUL, OP_DIV)
- error (???)

methods:
- parseInput
- calculate
- reset

getters:
- getResult
- getExpression

events:
- onInput
- onCalculate
- onError (???)
*/


export const Calc = class {
  constructor(locale = getNavigatorLanguage()) {
    this.reset = this.reset.bind(this);
    this.putKey = this.putKey.bind(this);
    this.evalExpr = this.evalExpr.bind(this);
    this.calculate = this.calculate.bind(this);
    // this.formattedOutput = this.formattedOutput.bind(this);
    this._locale = 'en-US'; // locale;
    this._formatOptions = {
      style: 'decimal',
      notation: 'standard', // "scientific", "engineering", "compact"
      useGrouping: false, // 'auto', 'always', 'min2', false
      maximumFractionDigits: MAX_FRACTIONAL_LENGTH,
    }
    this._listeners = {}
    this._listeners[EVENT_INPUT] = []
    this._listeners[EVENT_CALC] = []
    this._history = [];
    this.setup();
    this.reset();
  }

  setup() {
    calc_keys.find(key => key.value === KEY_PERIOD).label = getDecimalSeparator(this._locale)
    calc_keys.forEach(key => {
      acceptedKeys[key.value] = key
      if (key.label)
        acceptedKeys[key.label] = key
      if (key.aliases)
        key.aliases.forEach(alias => {
          acceptedKeys[alias] = key
        })
    })
  }

  reset() {
    this._left = null;
    this._right = null;
    this._operation = null;
    this._lastKey = null;
    this._result = 0;
    this._inputBuff = '';
  }

  addListener(type, listener) {
    const a = typeof listener
    const b = Object.keys(this._listeners)
    if (typeof listener === 'function' && Object.keys(this._listeners).includes(type)) {
      if (!this._listeners[type].includes(listener))
        this._listeners[type].push(listener)
    }
  }

  broadcast(type, payload = null) {
    if (Object.keys(this._listeners).includes(type)) {
      this._listeners[type].forEach(l => l(payload))
    }
  }

  evalExpr(s){
    [...s].forEach((key) => this.putKey(key))
  }

  round = (n) => {
    return parseFloat(n.toFixed(MAX_FRACTIONAL_LENGTH))
  }

  putKey(s) {
    if (!(s in acceptedKeys))
      return null
    const key = acceptedKeys[s]
    // console.log(key, this)
    switch (key.type) {
      case KEY_TYPE_INPUT:
        if (this._lastKey?.type !== KEY_TYPE_INPUT && this._lastKey?.value !== KEY_DELETE)
          this._inputBuff = ''
        if (key.value !== KEY_PERIOD) {
          this._inputBuff += key.value;
        } else if (!this._inputBuff.includes(KEY_PERIOD)) {
          if (!this._inputBuff)
            this._inputBuff = '0'
          this._inputBuff += KEY_PERIOD;
        }
        if (this._lastKey?.type === KEY_TYPE_ENTER)
          this._left = null;
        break;
      case KEY_TYPE_OPERATION:
        if (this._lastKey?.type !== KEY_TYPE_OPERATION) {
          if (this._inputBuff) {
            if (this._left !== null && this._operation) {
              this._right = this.parseInput();
              this.calculate();
              this._left = this._result;
              this._right = null;
            } else {
              this._left = this.parseInput(false);
              this._result = this._left;
            }
          } else {
            this._right = null;
            if (this._left === null)
              this._left = this._result
          }
        }
        this._operation = key.value
        break;
      case KEY_TYPE_COMMAND:
        switch (key.value) {
          case KEY_RESET:
            this.reset();
            break;
          case KEY_DELETE:
            if (this._inputBuff && (this._lastKey?.type === KEY_TYPE_INPUT || this._lastKey?.value === KEY_DELETE)) {
              if (this._inputBuff.length === 1)
                this._inputBuff = '0'
              else
                this._inputBuff = this._inputBuff.slice(0, -1)
            } else {
              this._left = null;
              this._right = null;
            }
            break;
        }
        break;
      case KEY_TYPE_ENTER:
        if (this._operation) {
          if (this._lastKey?.type !== KEY_TYPE_INPUT)
            this._left = this._result;
          if (this._left === null)
            this._left = this._inputBuff ? this.parseInput() : this._result;
          if (this._right === null)
            this._right = this._inputBuff ? this.parseInput() : this._result;
          this.calculate();
        }
        break;
    }
    this._lastKey = key
    this.broadcast(EVENT_INPUT, key.value)
    return key.value
  }

  calculate() {
    if (this._left !== null && this._right !== null && this._operation) {
      let res;
      switch (this._operation) {
        case KEY_PLUS:
          res = this._left + this._right;
          break;
        case KEY_MINUS:
          res = this._left - this._right;
          break;
        case KEY_MUL:
          res = this._left * this._right;
          break;
        case KEY_DIV:
          res = this._left / this._right;
          break;
        default:
          break;
      }
      this._result = this.round(res);
      this.broadcast(EVENT_CALC, this.output)
      this._history.push({
        left: this._left,
        right: this._right,
        op: this._operation,
        res: this._result,
      })
    }
  }

  parseInput(reset = true) {
    const val = parseFloat(this._inputBuff);
    if (reset)
      this._inputBuff = '';
    return val;
  }

  get output() {
    return this._inputBuff ? this.parseInput(false) : this._result;
  }

  get formattedOutput() {
    const _formatOptions = {
      style: 'decimal',
      notation: 'standard', // "scientific", "engineering", "compact"
      useGrouping: false, // 'auto', 'always', 'min2', false
      maximumFractionDigits: MAX_FRACTIONAL_LENGTH,
    }
    // https://stackoverflow.com/questions/1074660/with-a-browser-how-do-i-know-which-decimal-separator-does-the-operating-system
    // return this._inputBuff ? this._inputBuff : this._result.toLocaleString(this._locale, this._formatOptions);
    return this.output.toLocaleString(this._locale, _formatOptions);
  }

  get expr() {
    let res = ''
    if (this._left !== null) {
      res = this._left.toLocaleString()
      if (this._operation) {
        res += ` ${this._operation}`
        if (this._right)
          res += ` ${this._right} =`
      }
    }
    return res;
  }

  get history() {
    return this._history.toReversed();
  }

  // get result() {
  //   // return this.mode === MODE_RES ? this.res.toString() : this.value;
  //   let options = {
  //     useGrouping: 'always',
  //     // notation: this.val1 <= MAX_NORMAL ? "standard" : "scientific",    // "standard", "scientific", "engineering", "compact"
  //   }
  //   const ret_val = this.mode === MODE_RES ? this.res : this.val1;
  //   return ret_val <= MAX_NORMAL ? ret_val.toLocaleString('fr-FR', options) : ret_val.toExponential(8);
  //   // return (this.mode === MODE_RES ? this.res : this.val1).toLocaleString('en-US', options);
  // }
}


// const calc = new Calc()
//
// const expr = '1.56 + 5 - 3 ='
// calc.evalExpr('-2+3+5*4=')
// let r = calc.output;
// console.log(r)
