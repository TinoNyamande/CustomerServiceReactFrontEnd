import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin , setIsAdmin] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const makeAdmin=() => {
    setIsAdmin(true);
  }

  const removeAdmin=() => {
    setIsAdmin(false);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout,isAdmin,makeAdmin,removeAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
