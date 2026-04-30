import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const navigate = useNavigate(); // ✅ always called

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          isAdmin: parsedUser.isAdmin === true,
        });
      } catch (err) {
        console.error("Invalid user in storage");
        localStorage.removeItem("user");
      }
    }
    setLoadingUser(false);
  }, []);

  const login = (userData) => {
    const safeUser = {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      isAdmin: userData.isAdmin === true,
      token: userData.token,
    };

    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(safeUser));
    localStorage.setItem("token", safeUser.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
