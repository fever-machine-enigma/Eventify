import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:5000";

export const useEventLog = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const fetchLog = async () => {
    setIsLoading(true);
    setError(null);
    const response = await axios.post(
      `${API_URL}/fetch-log`,
      {
        user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.data;
    console.log(data);
    if (response.status === 401 || response.status === 404) {
      setIsLoading(true);
      setError(data.error);
      return data;
    }

    if (response.status === 201) {
      setIsLoading(false);
      return data;
    }
  };

  return { fetchLog, error, isLoading };
};
