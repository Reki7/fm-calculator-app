export const keyValues = {
  KEY_PERIOD: '.',
  KEY_PLUS: '+',
  KEY_MINUS: '-',
  KEY_MUL: '*',
  KEY_DIV: '/',
  KEY_DELETE: 'Delete',
  KEY_RESET: 'Escape',
  KEY_ENTER: 'Enter',
}

export const keyTypes = {
  KEY_TYPE_INPUT: 'input',
  KEY_TYPE_OPERATION: 'operation',
  KEY_TYPE_COMMAND: 'command',
  KEY_TYPE_ENTER: 'enter',
}

export const eventTypes = {
  EVENT_INPUT: 'calc_evt_input',
  EVENT_CALC: 'calc_evt_calc',
}

export const calc_keys = [
  {
    label: '0',
    value: '0',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '1',
    value: '1',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '2',
    value: '2',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '3',
    value: '3',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '4',
    value: '4',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '5',
    value: '5',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '6',
    value: '6',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '7',
    value: '7',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '8',
    value: '8',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '9',
    value: '9',
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '.',
    value: keyValues.KEY_PERIOD,
    type: keyTypes.KEY_TYPE_INPUT
  },
  {
    label: '+',
    value: keyValues.KEY_PLUS,
    type: keyTypes.KEY_TYPE_OPERATION
  },
  {
    label: '-',
    value: keyValues.KEY_MINUS,
    type: keyTypes.KEY_TYPE_OPERATION
  },
  {
    label: '/',
    value: keyValues.KEY_DIV,
    type: keyTypes.KEY_TYPE_OPERATION
  },
  {
    label: 'x',
    value: keyValues.KEY_MUL,
    type: keyTypes.KEY_TYPE_OPERATION
  },
  {
    label: 'Del',
    value: keyValues.KEY_DELETE,
    type: keyTypes.KEY_TYPE_COMMAND,
    aliases: ['Backspace']
  },
  {
    label: 'Reset',
    value: keyValues.KEY_RESET,
    type: keyTypes.KEY_TYPE_COMMAND
  },
  {
    label: '=',
    value: keyValues.KEY_ENTER,
    type: keyTypes.KEY_TYPE_ENTER
  },
]

export let acceptedKeys = {}