import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, pwd) => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(`${API_URL}/login`, { email, pwd });
      const { token, user, firstName, lastName } = response.data;
      console.log(firstName, lastName);
      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user); // Update user object with retrieved data
        setFirstName(firstName); // Update user object with retrieved data
        setLastName(lastName);
        return { success: true }; // Update user object with retrieved data
      } else {
        setError("An error occured during login.");
        return { success: false };
      }
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false); // Set loading state to false after operation
    }
  };

  const register = async (firstName, lastName, email, pwd) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        firstName,
        lastName,
        email,
        pwd,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser({ email });
        // Update user object with email for now
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const getLog = async () => {
    try {
      const response = await axios.get(`${API_URL}/eventlog`);
      console.log(response);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => !!user; // Check if user exists in context

  const getToken = () => localStorage.getItem("token"); // Retrieve token from storage

  return {
    user,
    firstName,
    lastName,
    error,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    getToken,
    getLog,
  };
};

export default useAuth;
