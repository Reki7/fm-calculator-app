import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 0 24px;
  padding: 20px 30px;
  height: 137px;
  align-items: center;
  width: 100%;
  border-radius: 15px;
  background-color: var(--screen-bg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  
  @media (max-width: 767px) {
    height: 90px;
    padding: 10px 24px;
    border-radius: 10px;
  }
`;

const Output = styled.div`
  width: 100%;
  //font-size: 3.5rem;
  font-size: calc(64px * ${props => props.scale ? props.scale : 1});
  padding: 3px 0;
  margin: auto;
  color: var(--screen-text-color);
  text-align: right;
  overflow: hidden;
  @media(max-width: 767px) {
    //font-size: 3rem;
    font-size: calc(42px * ${props => props.scale ? props.scale : 1});
  };
`;

const Expr = styled.div`
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  height: 20px;
  color: var(--keys-blue-bg);
  text-align: right;
  //cursor: pointer;
`;

const HistoryIcon = styled.div`
  position: absolute;
  bottom: 8px;
  right: 30px;
  color: var(--keys-blue-bg);
  cursor: pointer;
  @media(max-width: 767px) {
    display: none;
  };
`;

const SCREEN_MAX_DIGS = 12

const Screen = ({value = '', expr= '', historyClick = null}) => {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (value.length > SCREEN_MAX_DIGS) {
      setScale(SCREEN_MAX_DIGS / value.length)
    }
  }, [value])

  return (
    <Wrapper>
      <Expr onClick={expr ? historyClick : null} style={expr ? {cursor: 'pointer'} : {}}>{expr}</Expr>
      <Output scale={scale}>{value}</Output>
      <HistoryIcon className="material-symbols-outlined" onClick={historyClick}>history</HistoryIcon>
    </Wrapper>
  );
};

export default Screen;