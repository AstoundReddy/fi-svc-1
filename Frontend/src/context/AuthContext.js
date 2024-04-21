import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userCookie = Cookies.get("user");
    console.log("userCookie", userCookie);
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    } else {
      if (location.pathname !== "/login") {
        toast.error("Please login to access the dashboard");
        navigate("/login");
      }
    }
  }, [location, navigate]);
  const login = (userData) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
