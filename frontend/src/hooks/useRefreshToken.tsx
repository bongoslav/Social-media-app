import axios from "../api/axios";
import useAuth from "./useAuth";
import { AuthData } from "../context/authProvider";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev: AuthData) => {
      console.log(JSON.stringify(prev));
      console.log(JSON.stringify(response.data.accessToken));
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
