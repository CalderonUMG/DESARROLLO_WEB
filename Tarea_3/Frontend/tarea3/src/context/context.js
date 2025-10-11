import { createContext, useContext } from "react";

// Crear el contexto
export const UserContext = createContext();

// Hook personalizado para acceder fácilmente al contexto
export const useUser = () => useContext(UserContext);
