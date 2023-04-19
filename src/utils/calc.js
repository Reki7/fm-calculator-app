export const buttons = [
  '7', '8', '9', 'Delete',
  '4', '5', '6', '+',
  '1', '2', '3', '-',
  '.', '0', '/', 'x',
  'Reset', '=',
]

const MODE_VAL = 'mode_val'
const MODE_OP = 'mode_op'
const MODE_RES = 'mode_res'

// const MAX_NUMBER = 1.0e15
// const MAX_DECIMAL = 10
const MAX_NORMAL = 9999999999


export const Calc = class {
  constructor() {
    this.reset = this.reset.bind(this);
    this.putKey = this.putKey.bind(this);
    this.calc = this.calc.bind(this);
    this.history = [];
    this.reset();
  }

  reset() {
    this.val2 = null;
    this.res = null;
    this.value = '0'
    this.op = '';
    this.mode = MODE_VAL;
  }

  calc() {
    if (this.val2 !== null && this.op !== '') {
      if (this.mode === MODE_RES)
        this.val2 = this.res;
      let res = 0;
      switch (this.op) {
        case '+':
          res = this.val2 + this.val1;
          break;
        case '-':
          res = this.val2 - this.val1;
          break;
        case 'x':
          res = this.val2 * this.val1;
          break;
        case '/':
          res = this.val2 / this.val1;
          break;
        default:
          break;
      }
      this.history.push({
        left: this.val2,
        right: this.val1,
        op: this.op
      })
      this.res = res;
      this.mode = MODE_RES;
    }
  }

  putKey(key) {
    // console.log(this.mode, key, this.val2)
    if (key === 'Reset') {
      this.reset();
    } else if (key === 'Del') {
      if (this.mode === MODE_VAL) {
        if (this.value.length > 1)
          this.value = this.value.slice(0, -1)
        else
          this.value = '0'
      }
    } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(key)) {
      if (this.mode === MODE_OP) {
        this.val2 = this.val1;
        this.value = '0';
        this.mode = MODE_VAL;
      } else if (this.mode === MODE_RES) {
        this.reset();
      }
      if (this.mode === MODE_VAL) {
        if (key === '.') {
          if (!this.value.includes('.'))
            this.value += '.'
        } else {
          this.value = this.value === '0' ? key : this.value + key;
        }
      }
    } else if (['+', '-', '/', 'x'].includes(key)) {
      if (this.mode === MODE_RES) {
        this.val2 = this.res;
        this.value = this.res.toString();
        this.res = 0;
        this.mode = MODE_OP;
      } else if (this.mode === MODE_VAL) {
        if (this.val2 !== null) {   // Windows Calc
          this.calc();
          this.val2 = this.res;
          this.value = this.res.toString();
        } else {
          this.val2 = this.val1;
        }
        this.mode = MODE_OP;
      }
      if (this.mode ===  MODE_OP) {
        this.op = key;
      }
    } else if (key === '=') {
      this.calc()
    }
  }

  get val1() {
    return parseFloat(this.value);
  }

  get expr() {
    switch (this.mode) {
      case MODE_RES:
        return `${this.val2} ${this.op} ${this.val1} =`;
      case MODE_VAL:
      case MODE_OP:
      default:
        return this.val2 !== null ? `${this.val2} ${this.op}` : '';
    }
  }

  get result() {
    // return this.mode === MODE_RES ? this.res.toString() : this.value;
    let options = {
      useGrouping: 'always',
      // notation: this.val1 <= MAX_NORMAL ? "standard" : "scientific",    // "standard", "scientific", "engineering", "compact"
    }
    const ret_val = this.mode === MODE_RES ? this.res : this.val1;
    return ret_val <= MAX_NORMAL ? ret_val.toLocaleString('en-US', options) : ret_val.toExponential(8);
    // return (this.mode === MODE_RES ? this.res : this.val1).toLocaleString('en-US', options);
  }
}