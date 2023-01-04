import { useState, createContext } from "react";
const AuthContext = createContext(null);
const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
