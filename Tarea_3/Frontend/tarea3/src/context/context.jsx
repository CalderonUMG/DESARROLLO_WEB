import { useState } from "react";
import { UserContext } from "./context";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    console.log("✅ Sesión iniciada:", userData);
  };

  const logout = () => {
    setUser(null);
    console.log("🚪 Sesión cerrada");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
