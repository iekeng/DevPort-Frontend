import { createContext, useContext, useMemo } from "react";
import DevPortApiClient from "../apiClients/DevPortApiclient";

export const ApiContext = createContext();

export default function ApiProvider({children}) {

  const api = new DevPortApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  return useContext(ApiContext);
}