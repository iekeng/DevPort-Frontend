import { useContext, createContext, useState} from "react";

const stepContext = createContext();

let step = 0;

export default function stepProvider({children}) {
  return (
    <stepContext.Provider value={step}>
      {children}
    </stepContext.Provider>
  )
}

export function useStep() {
  return stepContext().step
}