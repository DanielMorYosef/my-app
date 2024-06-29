import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userID, setUserID] = useState(null);
  const [favCards, setFavCards] = useState([]);
  const [isToggle, setIsToggle] = useState(false);

  const handleLoginSuccess = (isBusiness, isAdmin) => {
    setIsRegistered(true);
    if (isBusiness) {
      setIsBusiness(true);
    }
    if (isAdmin) {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsRegistered(false);
    setIsBusiness(false);
    setIsAdmin(false);
    setUserID(null);
    localStorage.removeItem("authToken");
  };

  const initializeUser = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserID(decodedToken._id);
        setIsRegistered(true);
        setIsBusiness(decodedToken.isBusiness);
        setIsAdmin(decodedToken.isAdmin);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("authToken");
      }
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isRegistered,
        handleLoginSuccess,
        handleLogout,
        isBusiness,
        userID,
        setUserID,
        favCards,
        setFavCards,
        isToggle,
        setIsToggle,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
