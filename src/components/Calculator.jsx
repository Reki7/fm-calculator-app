import React, {useState} from 'react';
import styled from "styled-components";
import Keypad from "./Keypad";
import Screen from "./Screen";
import {Calc} from "../utils/calc";
import Header from "./Header";

const Wrapper = styled.div`
  width: 540px;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;
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

  const handleKey = (key) => {
    // console.log(key);
    calc.putKey(key);         //TODO: useEffect?
    setScreenValue(calc.result);
    setScreenExpr(calc.expr);
  }

  return (
    <Wrapper>
      <Header />
      <Screen value={calc.result} expr={calc.expr}/>
      <Keypad handleKey={handleKey}  />
    </Wrapper>
  );
};

export default Calculator;