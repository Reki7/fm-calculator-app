import {useEffect, useState} from "react";

export const useButtonPressed = (onChange) => {
  const [triggerKey, setTriggerKey] = useState({});
  const [buttonPressed, setButtonPressed] = useState(null);

  const handler = (key) => {
    setTriggerKey({key})
    onChange(key)
  }

  useEffect(() => {
    if (!buttonPressed) {
      setButtonPressed(triggerKey.key);
      setTimeout(() => {
        setButtonPressed(null);
      }, 200);
    }
  }, [triggerKey]);

  return handler;
}