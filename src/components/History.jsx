import React from 'react';
import styled from "styled-components";
import HistoryEntry from "./HistoryEntry";

const Wrapper = styled.div`
  padding: 30px 25px 30px 30px;
  width: 100%;
  height: 478px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: end;
  border-radius: 15px;
  background-color: var(--screen-bg);
  color: var(--keys-blue-bg);
  text-align: right;
  @media (max-width: 767px) {
    height: 418px;
    //padding: 24px;
    padding: 24px 19px 24px 24px;
    border-radius: 10px;
  }
`;

const Scrollable = styled.div`
  width: 100%;
  height: 100%;
  //padding-right: 5px;
  overflow: auto;
  background-color: var(--keypad_bg);
  padding: 10px;
  border-radius: 5px;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px var(--keys-blue-bg);
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--keys-blue-bg);
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--screen-text-color);
  }
`;

const History = ({history}) => {
  return (
    <Wrapper>
      <Scrollable>
        {history.length
          ? history.map((entry, i) =>
              <HistoryEntry key={i} entry={entry}/>
          )
          : <div>History is empty</div>
        }
      </Scrollable>
    </Wrapper>
  );
};

export default History;