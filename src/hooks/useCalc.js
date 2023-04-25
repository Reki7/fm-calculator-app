import {useCallback, useEffect, useRef, useState} from "react";
import {Calc, eventTypes} from "../services/calc";

export const useCalc = (onInput = null) => {
  const calc = useRef(new Calc())
  const [output, setOutput] = useState('');
  const [expr, setExpr] = useState('');

  const calcInstance = () => calc?.current

  const calcInputHandler = (key) => {
    if (calcInstance() && output !== calcInstance().formattedOutput) {
      setOutput(calcInstance().formattedOutput)
    }
    // console.log(`key: ${key}, expression: "${expr}", expr: "${calcInstance().expr}"`)
    // if (calcInstance() && (expr !== calcInstance().expr))    // TODO: Doesn't work correctly
      setExpr(calcInstance().expr)
    if (onInput) {
      onInput(key)
    }
  }

  const calcCalculateHandler = () => {
    setOutput(calcInstance().formattedOutput)
    setExpr(calcInstance().expr)
  }

  const putKey = (key) => {
    return calcInstance().putKey(key)
  }

  useEffect(() => {
    calcInstance().addListener(eventTypes.EVENT_INPUT, calcInputHandler)
    calcInstance().addListener(eventTypes.EVENT_CALC, calcCalculateHandler)
    calcCalculateHandler()
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

  const history = calcInstance().history;

  return { output, expr, history, putKey }
}