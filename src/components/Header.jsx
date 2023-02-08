import React from 'react';
import styled from "styled-components";
import ThemeSwitch from "./ThemeSwitch";

const Wrapper = styled.div`
  margin-bottom: 32px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  color: var(--main-text-color);
`;

const Label = styled.div`
  padding-left: 6px;
  font-size: 30px;
  line-height: 34px;
  text-align: left;
`;

const Header = () => {
  return (
    <Wrapper>
      <Label>calc</Label>
      <ThemeSwitch />
    </Wrapper>
  );
};

export default Header;