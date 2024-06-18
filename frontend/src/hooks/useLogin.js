import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, pwd) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post(`${API_URL}/login`, {
      email,
      pwd,
    });

    const data = await response.data;
    console.log(response.status);
    if (response.status === 400) {
      setIsLoading(true);
      setError(json.error);
      return false;
    }

    if (response.status === 200) {
      // save user token to local storage
      localStorage.setItem("user", JSON.stringify(data));
      // update auth context
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
      return true;
    }
  };

  return { login, isLoading, error };
};
