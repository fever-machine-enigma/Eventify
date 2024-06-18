import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (firstName, lastName, email, pwd) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post(`${API_URL}/register`, {
      firstName,
      lastName,
      email,
      pwd,
    });

    const data = await response.data;

    if (response.status === 400) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.status === 201) {
      // save user token to local storage
      localStorage.setItem("user", JSON.stringify(data));
      // update auth context
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
