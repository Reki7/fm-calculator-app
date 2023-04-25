import React from 'react';
import styled from "styled-components";
import {acceptedKeys} from "../services/calc.mjs";
import CalcButton from "./CalcButton";

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
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 62px);
  gap: 27px 24px;
  @media(max-width: 767px) {
    gap: 15px 13px;
  }
`;


export const buttonsLayout = [
  '7', '8', '9', 'Delete',
  '4', '5', '6', '+',
  '1', '2', '3', '-',
  '.', '0', '/', 'x',
  'Reset', '=',
]

const Keypad = ({handleKey}) => {
  return (
    <Wrapper>
      <Pad>
        {buttonsLayout.map(k => {
          const { value, label, type } = acceptedKeys[k]
          return (
            <CalcButton
              key={value}
              id={value}
              btnType={type}
              clickHandler={handleKey}
              style={
                k === 'Reset'
                  ? {gridColumn: '1/3'}
                  : k === '='
                    ? {gridColumn: '3/5'}
                    : {}
              }
            >{label}</CalcButton>
          )
        })}
      </Pad>
    </Wrapper>
  );
};

export default Keypad;