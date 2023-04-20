import React, {createContext, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Keypad from "./Keypad";
import Screen from "./Screen";
import {Calc} from "../utils/calc";
import Header from "./Header";
import {buttons} from "../utils/calc";

const Wrapper = styled.div`
  width: 540px;
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  @media(max-width: 767px) {
    width: 327px;
  }
`;

export const KeydownContext = createContext(null);
const calc = new Calc()

const Calculator = () => {
  // const [calc, setCalc] = useState(new Calc());
  const [screenValue, setScreenValue] = useState('0');
  const [screenExpr, setScreenExpr] = useState('');
  const [lastKeyPressed, setLastKeyPressed] = useState('');
  const [keyPressed, setKeyPressed] = useState(null);

  const keydownListener = useCallback(keydownEvent => {
    let { key, target, repeat } = keydownEvent;
    console.log(key);
    if (repeat) return;
    if (key === 'Enter') key = '='
    if (key === 'Escape') key = 'Reset'
    if (buttons.includes(key)) {
      setLastKeyPressed(key);
      handleKey(key);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);
    return () => window.removeEventListener("keydown", keydownListener, true);
  }, [keydownListener]);

  useEffect(() => {
    if (!keyPressed) {
      setKeyPressed(lastKeyPressed);
      const handler = setTimeout(() => {
        setKeyPressed(null);
      }, 200);
    }
  }, [lastKeyPressed])

  const handleKey = useCallback((key) => {
    calc.putKey(key);         //TODO: useEffect?
    setScreenValue(calc.result);
    setScreenExpr(calc.expr);
  }, [])

  console.log('--render Calculator')
  return (
    <KeydownContext.Provider value={keyPressed}>
      <Wrapper>
        <Header />
        <Screen value={screenValue} expr={screenExpr}/>
        <Keypad handleKey={handleKey}  />
      </Wrapper>
    </KeydownContext.Provider>
  );
};

export default Calculator;