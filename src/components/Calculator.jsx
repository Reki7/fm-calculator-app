import React, {createContext, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Keypad from "./Keypad";
import Screen from "./Screen";
import Header from "./Header";
import {useCalc} from "../hooks/useCalc";
import {useButtonPressed} from "../hooks/useButtonPressed";

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

const Calculator = () => {
  const [buttonPressed, setButtonPressed] = useState(null);
  // const handleCalcInput = useButtonPressed(setButtonPressed)

  const [triggerKey, setTriggerKey] = useState({});
  const handleCalcInput = (key) => {
    setTriggerKey({key})
  }
  useEffect(() => {
    if (!buttonPressed) {
      setButtonPressed(triggerKey.key);
      setTimeout(() => {
        setButtonPressed(null);
      }, 150);
    }
  }, [triggerKey]);

  const { output, expression, putKey } = useCalc(handleCalcInput)

  return (
    <KeydownContext.Provider value={buttonPressed}>
      <Wrapper>
        <Header />
        <Screen value={output} expr={expression}/>
        <Keypad handleKey={putKey}  />
      </Wrapper>
    </KeydownContext.Provider>
  );
};

export default Calculator;