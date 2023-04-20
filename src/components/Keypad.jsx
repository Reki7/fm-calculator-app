import React, {useContext, useRef} from 'react';
import styled from "styled-components";
import {buttons} from "../utils/calc";
import {KeydownContext} from "./Calculator";

const Wrapper = styled.div`
  padding: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  background-color: var(--keypad_bg);
  @media(max-width: 767px) {
    padding: 24px;
    border-radius: 10px;
  }
`;

const Pad = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 62px);
  gap: 27px 24px;
  @media(max-width: 767px) {
    gap: 15px 13px;
  }
`;



const Button = styled.button`
  padding: 16px 0;
  text-align: center;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-family: 'League Spartan', sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: var(--keys-gray-text-color);
  background-color: var(--keys-gray-bg);
  box-shadow: var(--keys-gray-shadow);
  outline: none;
  &:hover {
    background-color: var(--keys-gray-hover);
  };
  &.hovered {
    background-color: var(--keys-gray-hover);
  };  @media(max-width: 767px) {
    border-radius: 8px;
    font-size: 34px;
  }
`;

const ButtonBlue = styled(Button)`
  padding: 22px 0;
  font-size: 28px;
  text-transform: uppercase;
  color: var(--keys-blue-text-color);
  background-color: var(--keys-blue-bg);
  box-shadow: var(--keys-blue-shadow);
  &:hover {
    background-color: var(--keys-blue-hover);
  };
  @media(max-width: 767px) {
    padding: 24px 0;
    font-size: 20px;
  };
`;

const ButtonRed = styled(ButtonBlue)`
  color: var(--keys-red-text-color);
  background-color: var(--keys-red-bg);
  box-shadow: var(--keys-red-shadow);
  &:hover {
    background-color: var(--keys-red-hover);
  }
`;



const CalcButton = ({id = '', btnType = 'grayBtn', ...rest}) => {
  // const keyPressed = useContext(KeydownContext);
  console.log('render: ', id)

  const keyPressed = useContext(KeydownContext)
  if (keyPressed) {
  }

  let Btn = Button;
  if (btnType === 'blueBtn')
    Btn = ButtonBlue;
  else if (btnType === 'redBtn')
    Btn = ButtonRed;

  return (
    <Btn id={id} className={keyPressed === id && 'hovered'} {...rest} />
  )
};

const Keypad = ({handleKey}) => {
  console.log('-render KeyPad')
  return (
    <Wrapper>
      <Pad>
        {buttons.slice(0, 16).map(k => {
          return (
            <CalcButton
              key={k}
              id={k}
              onClick={() => handleKey(k)}
              btnType={k === 'Delete' ? 'blueBtn' : 'grayBtn'}
            >{k !== 'Delete' ? k : 'Del'}</CalcButton>
          )
        })}
        <ButtonBlue
          onClick={() => handleKey('Reset')}
          style={{gridColumn: '1/3'}}
        >Reset</ButtonBlue>
        <ButtonRed
          onClick={() => handleKey('=')}
          style={{gridColumn: '3/5'}}
        >=</ButtonRed>
      </Pad>
    </Wrapper>
  );
};

export default Keypad;