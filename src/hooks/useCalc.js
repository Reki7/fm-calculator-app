import {useCallback, useEffect, useRef, useState} from "react";
import {Calc, eventTypes} from "../services/calc2.mjs";

export const useCalc = (onInput = null) => {
  const calc = useRef(new Calc())
  const [output, setOutput] = useState('');
  const [expression, setExpression] = useState('');

  const calcInstance = () => calc?.current

  const calcInputHandler = (key) => {
    if (calcInstance() && output !== calcInstance().output) {
      setOutput(calcInstance().output)
    }
    if (calcInstance() && expression !== calcInstance().expr)
      setExpression(calcInstance().expr)
    if (onInput) {
      onInput(key)
    }
  }

  const calcCalculateHandler = () => {
    setOutput(calcInstance().output)
    setExpression(calcInstance().expr)
  }

  const putKey = (key) => {
    return calcInstance().putKey(key)
  }

  useEffect(() => {
    calcInstance().addListener(eventTypes.EVENT_INPUT, calcInputHandler)
    calcInstance().addListener(eventTypes.EVENT_CALC, calcCalculateHandler)
    setOutput(calcInstance().output)
    setExpression(calcInstance().expr)
  }, [])

  const keydownListener = useCallback(keydownEvent => {
    let { key, target, repeat } = keydownEvent;
    console.log(key);
    if (repeat)
      return;
    putKey(key)
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);
    return () => window.removeEventListener("keydown", keydownListener, true);
  }, [keydownListener]);


  return { output, expression, putKey }
}