
import { createContext, useContext, useEffect, useState } from "react";

import { getAuthorByUserId } from '../services/blogService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (user) => {

    let authorId = null;

    if (user.role === "author" || user.role === "admin")
    {
      const res = await getAuthorByUserId(user.id);

      authorId = res.data[0]?.id;
    }

    const authData = { ...user, authorId };

    setCurrentUser(authData);
    localStorage.setItem("user", JSON.stringify(authData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        loading,
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);