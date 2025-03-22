import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: null,
  token: null,
  isLogged: null,
  loginUser: null,
  logoutUser: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const rawToken = localStorage.getItem('token');
    const rawUser = localStorage.getItem('user');

    if (rawToken) {
      setToken(rawToken);
    }

    if (rawUser) {
      setUser(JSON.parse(rawUser));
    }

    setIsLoaded(true);
  }, []);

  const value = {
    user,
    token,
    isLoaded,
    isLogged: () => {
      return user !== null && token !== null;
    },
    loginUser: ({ token, payload }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(payload));
      setToken(token);
      setUser(payload);
    },
    logoutUser: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context || null;
};
