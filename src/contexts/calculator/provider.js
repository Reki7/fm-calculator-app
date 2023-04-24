import {useReducer} from "react";
import {CalculatorContext} from "./context";

export const CalculatorProvider = ({ children }) => {
  const [calcState, addListener, dispatch] = useReducer(reducer, initialState);

  return (
    <CalculatorContext.Provider value={[calcState, addListener, dispatch]}>
      { children }
    </CalculatorContext.Provider>
  )
}