import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from "styled-components";

const slide = keyframes`
  0% { transform: translateX(0px) }
  100% { transform: translateX(50px) }
`;

const Wrapper = styled.div`
  display: flex;
  //flex-direction: row;
  align-items: end;
`;

const Switch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SwitchLabels = styled.div`
  display: flex;
  //flex-direction: row;
  //justify-content: center;
  & > div {
    width: 22px;
    line-height: 22px;
    color: var(--main-text-color);
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }
`;

const SwitchFrame = styled.div`
  padding: 3px 4px;
  display: flex;
  //flex-direction: row;
  //justify-content: center;
  //align-items: center;
  border-radius: 15px;
  background-color: var(--keypad_bg);
`;

const SwitchButton = styled.div`
  margin: 2px;
  width: 17px;
  height: 17px;
  border-radius: 100%;
  //background-color: transparent;
  transition-property: left;
  // &:hover {
  //   animation: ${slide} 0.5s ease-in;
  // }
  ${props => props.active && css`
    background-color: var(--keys-red-bg);
  `}
`;

const SwitchTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 26px;
  margin-right: 27px;
`;


const themes = ['theme1', 'theme2', 'theme3']

const ThemeSwitch = () => {
  const [activeTheme, setActiveTheme] = useState(themes[0])

  useEffect(() => {   //TODO: move outside?
    document.body.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  const clickHandler = (key) => {
    setActiveTheme(key)
  }

  return (
    <Wrapper>
      <SwitchTitle>Theme</SwitchTitle>
      <Switch>
        <SwitchLabels>
          {themes.map((_, k) => (
            <div key={k+1}>{k+1}</div>
          ))}
        </SwitchLabels>
        <SwitchFrame>
          {themes.map(t => (
            <SwitchButton key={t} active={activeTheme === t} onClick={() => clickHandler(t)} />
          ))}
        </SwitchFrame>
      </Switch>
    </Wrapper>
  );
};

export default ThemeSwitch;