import React, {createContext, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Keypad from "./Keypad";
import Screen from "./Screen";
import Header from "./Header";
import {Calc, eventTypes} from "../services/calc2";
import {useKeypress} from "../hooks/useKeypress";

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
// const calc = new Calc()

const Calculator = () => {
  const [calc, setCalc] = useState(new Calc());
  const [screenValue, setScreenValue] = useState('0');
  const [screenExpr, setScreenExpr] = useState('');
  const [keyPressed, setKeyPressed] = useState(null);

  // let calc;
  const cb = (payload) => {
    console.log("CB: ", payload);
  }
  useEffect(() => {
    // calc = new Calc()
    calc.addListener(eventTypes.EVENT_INPUT, cb)
  }, [])

  const handleKeyPress = useCallback(key => {
    setKeyPressed(key);
    handleKey(key);
  })

  useKeypress(handleKeyPress)

  const handleKey = useCallback((key) => {
    calc.putKey(key);         //TODO: useEffect?
    setScreenValue(calc.output);
    setScreenExpr(calc.expr);
  }, [])

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