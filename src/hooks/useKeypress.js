import {useCallback, useEffect, useState} from "react";
import {buttons} from "../services/calc";

export function useKeypress(handleKeyPress, pressedDuration = 150) {
  const [lastKeyPressed, setLastKeyPressed] = useState({});
  const [keyPressed, setKeyPressed] = useState(null);

  const onKeyPress = (key) => {
    setKeyPressed(key);
    handleKeyPress(key);
  }

  const keydownListener = useCallback(keydownEvent => {
    let { key, target, repeat } = keydownEvent;
    console.log(key);
    if (repeat)
      return;
    keyHandler(key)
  }, []);

  const keyHandler = (key) => {
    setLastKeyPressed({key});
  }

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);
    return () => window.removeEventListener("keydown", keydownListener, true);
  }, [keydownListener]);

  useEffect(() => {
    if (!keyPressed) {
      onKeyPress(lastKeyPressed.key);
      setTimeout(() => {
        onKeyPress(null);
      }, pressedDuration);
    }

    return () => {
      // console.log('useEffect.cleanup()')
    }
  }, [lastKeyPressed]);

  return keyHandler;
}
