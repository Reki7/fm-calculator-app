import {useEffect, useRef, useState} from "react";
import {Calc, eventTypes} from "../services/calc2.mjs";

export const useCalc = (onInput = null) => {
  const calc = useRef(new Calc())
  const [output, setOutput] = useState('');
  const [expression, setExpression] = useState('');

  const calcInstance = () => calc?.current

  const inputHandler = (key) => {
    // console.log("inputHandler: ", key, calcInstance())

    if (onInput) {
      onInput(key)
    }
    if (calcInstance() && output !== calcInstance().output) {
      setOutput(calcInstance().output)
    }
    if (calcInstance() && expression !== calcInstance().expr)
      setExpression(calcInstance().expr)
  }

  const calcHandler = () => {
    // console.log("calcHandler: ", calcInstance().output)
    setOutput(calcInstance().output)
    setExpression(calcInstance().expr)
  }

  const putKey = (key) => {
    return calcInstance().putKey(key)
  }

  useEffect(() => {
    calcInstance().addListener(eventTypes.EVENT_INPUT, inputHandler)
    calcInstance().addListener(eventTypes.EVENT_CALC, calcHandler)
    setOutput(calcInstance().output)
    setExpression(calcInstance().expr)

    // console.log('useEffect out: ', calcInstance())
  }, [])


  return { output, expression, putKey }
}