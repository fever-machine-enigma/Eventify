import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = async (email, pwd) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, pwd });
      const { token } = response.data;
      if (token) {
        localStorage.setItem(`token`, token);
        setUser({ email });
        location.assign("home");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  const register = async (firstName, lastName, email, pwd) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        firstName,
        lastName,
        email,
        pwd,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem(`token`, token);
        setUser({ email });
        location.assign("login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return {
    user,
    error,
    login,
    register,
    logout,
  };
};

export default useAuth;
