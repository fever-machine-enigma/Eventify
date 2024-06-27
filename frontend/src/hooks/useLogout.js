import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const API_URL = "http://localhost:5000";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = async () => {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("user_id");
    return true;
  };

  return { logout };
};
