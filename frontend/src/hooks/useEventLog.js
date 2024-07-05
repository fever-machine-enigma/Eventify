import axios from "axios";
import { useState } from "react";

const API_URL = "https://ghotona-api.onrender.com";

export const useEventLog = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const fetchLog = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/fetch-log`,
        { user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedData = [...response.data];
      if (response.status === 401 || response.status === 404) {
        setError(response.data.error);
        return [];
      }

      return formattedData;
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchLog, error, isLoading };
};
