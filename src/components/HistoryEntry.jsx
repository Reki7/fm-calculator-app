import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 5px;
`;

const Expression = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--keys-blue-bg);
  text-align: right;
`;

const Result = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: var(--screen-text-color);
  padding: 3px 0;
  text-align: right;
`;


const HistoryEntry = ({entry}) => {
  return (
    <Wrapper>
      <Expression>{`${entry.left} ${entry.op} ${entry.right} = `}</Expression>
      <Result>{`${entry.res}`}</Result>
    </Wrapper>
  )
}

export default HistoryEntry;