import styled from "styled-components";
import React, {useContext} from "react";
import {KeydownContext} from "./Calculator";
import {keyTypes} from "../services/calc";

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
  &.pressed {
    box-shadow: none;
    position: relative;
    top: 4px;
    background-color: var(--keys-gray-hover);
  };  
  @media(max-width: 767px) {
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
  &.pressed {
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
  };
  &.pressed {
    background-color: var(--keys-red-hover);
  };
`;



const CalcButton = ({id = '', btnType = keyTypes.KEY_TYPE_INPUT, clickHandler = () => {}, ...rest}) => {
  const keyPressed = useContext(KeydownContext)

  let Btn = Button;
  if (btnType === keyTypes.KEY_TYPE_COMMAND)
    Btn = ButtonBlue;
  else if (btnType === keyTypes.KEY_TYPE_ENTER)
    Btn = ButtonRed;

  return (
    <Btn
      id={id}
      className={keyPressed === id && 'pressed'}
      onClick={() => clickHandler(id)}
      {...rest} />
  )
};

export default CalcButton