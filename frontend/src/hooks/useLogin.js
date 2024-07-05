import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const API_URL = "https://ghotona-api.onrender.com";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const data = await response.data;
    console.log(data);
    if (response.status === 400) {
      setIsLoading(true);
      setError(data.error);
      return false;
    }

    if (response.status === 200) {
      // save user token to local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("first_name", data.first_name);
      localStorage.setItem("last_name", data.last_name);
      localStorage.setItem("user_id", data.user_id);
      // update auth context
      dispatch({ type: "LOGIN", payload: data.token });
      setIsLoading(false);
      return true;
    }
  };

  return { login, isLoading, error };
};
