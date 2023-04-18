import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Keypad from "./Keypad";
import Screen from "./Screen";
import {Calc} from "../utils/calc";
import Header from "./Header";

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

const Calculator = () => {
  const [calc, setCalc] = useState(new Calc());
  const [screenValue, setScreenValue] = useState('0');
  const [screenExpr, setScreenExpr] = useState('');

  const keydownListener = useCallback(keydownEvent => {
    const { key, target, repeat } = keydownEvent;
    console.log(key);
    if (repeat) return;
    // if (blacklistedTargets.includes(target.tagName)) return;
    // if (!shortcutKeys.includes(key)) return;
    // if (!keys[key])
    //   setKeys({ type: "set-key-down", key });
    if(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']) {
      handleKey(key)
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);
    return () => window.removeEventListener("keydown", keydownListener, true);
  }, [keydownListener]);

  const handleKey = (key) => {
    // console.log(key);
    calc.putKey(key);         //TODO: useEffect?
    setScreenValue(calc.result);
    setScreenExpr(calc.expr);
  }

  return (
    <Wrapper>
      <Header />
      <Screen value={screenValue} expr={screenExpr}/>
      <Keypad handleKey={handleKey}  />
    </Wrapper>
  );
};

export default Calculator;