import React, { createContext, useState } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const login = (tok, r) => {
    localStorage.setItem('token', tok);
    localStorage.setItem('role', r);
    setToken(tok); setRole(r);
  };
  const logout = () => {
    localStorage.clear(); setToken(null); setRole(null);
  };
  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
