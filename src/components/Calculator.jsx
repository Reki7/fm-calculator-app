import React, {createContext, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Keypad from "./Keypad";
import Screen from "./Screen";
import Header from "./Header";
import {useKeypress} from "../hooks/useKeypress";
import {useCalc} from "../hooks/useCalc";

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
  const [keyPressed, setKeyPressed] = useState(null);
  const { output, expression, putKey } = useCalc()

  const handleKeyPress = useCallback(key => {
    console.log('handleKeyPress: ', key)
    if (key)
    setKeyPressed(putKey(key));
    // putKey(key);
  })

  const keyHandler = useKeypress(handleKeyPress)

  return (
    <KeydownContext.Provider value={keyPressed}>
      <Wrapper>
        <Header />
        <Screen value={output} expr={expression}/>
        <Keypad handleKey={keyHandler}  />
      </Wrapper>
    </KeydownContext.Provider>
  );
};

export default Calculator;