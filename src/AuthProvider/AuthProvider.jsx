import { createContext } from "react";

const AppContext = createContext();

export default function AuthProvider({ children }) {
  const allData = {};
  return <AppContext.Provider value={allData}>{children}</AppContext.Provider>;
}
