import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const API_URL = "http://localhost:5000";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (
    first_name,
    last_name,
    email,
    password,
    confirm_password
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post(`${API_URL}/register`, {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    });

    if (response.status === 400) {
      setIsLoading(false);
      setError(response.data.error);
      console.log(error);
      return false;
    }

    if (response.status === 201) {
      // save user token to local storage
      localStorage.setItem("token", JSON.stringify(response.token));
      // update auth context
      dispatch({ type: "LOGIN", payload: response.token });
      setIsLoading(false);
      return true;
    }
  };

  return { register, isLoading, error };
};
