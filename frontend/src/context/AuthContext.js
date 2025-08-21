import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  const login = (tok, r) => {
    localStorage.setItem("token", tok);
    localStorage.setItem("role", r);
    setToken(tok);
    setRole(r);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    navigate("/");   // 👈 redirect to HomePage after logout
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
