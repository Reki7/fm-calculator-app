import {useCallback, useEffect, useState} from "react";
import {buttons} from "../utils/calc";

export function useKeypress(handleKeyPress) {
  const [lastKeyPressed, setLastKeyPressed] = useState({});
  const [keyPressed, setKeyPressed] = useState(null);

  const onKeyPress = (key) => {
    setKeyPressed(key);
    handleKeyPress(key);
  }

  const keydownListener = useCallback(keydownEvent => {
    let { key, target, repeat } = keydownEvent;
    console.log(key);
    if (repeat) return;
    if (key === 'Enter') key = '='
    if (key === 'Delete' || key === 'Backspace') key = 'Del'
    if (key === 'Escape') key = 'Reset'
    if (!keyPressed && buttons.includes(key)) {
      setLastKeyPressed({key});
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);
    return () => window.removeEventListener("keydown", keydownListener, true);
  }, [keydownListener]);

  useEffect(() => {
    if (!keyPressed) {
      onKeyPress(lastKeyPressed.key);
      const handler = setTimeout(() => {
        onKeyPress(null);
      }, 200);
    }

    return () => {
      // console.log('useEffect.cleanup()')
    }
  }, [lastKeyPressed]);

  return () => keyPressed;
}
