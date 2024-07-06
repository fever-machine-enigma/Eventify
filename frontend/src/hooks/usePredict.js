import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:5000";

export const usePredict = () => {
  const [error, setError] = useState(null);

  const predict = async (input, user_id, token) => {
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/predict`,
        {
          input,
          user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { predict, error };
};
