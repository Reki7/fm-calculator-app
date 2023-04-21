import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from "styled-components";

const slide = keyframes`
  0% { transform: translateX(0px) }
  100% { transform: translateX(var(--theme-button-slide-x, 0)) }
`;

const Wrapper = styled.div`
  display: flex;
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
  border-radius: 15px;
  background-color: var(--keypad_bg);
`;

const SwitchButton = styled.div`
  margin: 2px;
  width: 17px;
  height: 17px;
  border-radius: 100%;
  cursor: pointer;
  ${props => props.active && css`
    background-color: var(--keys-red-bg);
    cursor: auto;
  `}
  ${props => props.animate && css`
    animation: ${slide} var(--theme-button-slide-time) ease-in-out;
    animation-fill-mode: forwards;
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
  const [activeTheme, setActiveTheme] = useState(0)
  const [targetTheme, setTargetTheme] = useState(0)

  useEffect(() => {   //TODO: move outside?
    document.body.setAttribute('data-theme', themes[activeTheme]);
  }, [activeTheme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-button-slide-x', `${(targetTheme - activeTheme) * 20}px`);
  }, [targetTheme, activeTheme])

  const clickHandler = (key) => {
    setTargetTheme(key)
    const color = getComputedStyle(document.documentElement).getPropertyValue('--theme-button-slide-x');
    console.log(color);
  }

  const switchTheme = () => {
    if (activeTheme !== targetTheme) {
      setActiveTheme(targetTheme)
    }
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
          {themes.map((_, k) => (
            <SwitchButton
              key={k}
              active={activeTheme === k}
              onClick={() => clickHandler(k)}
              animate={activeTheme !== targetTheme && activeTheme === k}
              onAnimationEnd={activeTheme === k ? switchTheme : ()=>{}}
            />
          ))}
        </SwitchFrame>
      </Switch>
    </Wrapper>
  );
};

export default ThemeSwitch;