import { useContext } from "react";
import AuthContext, { AuthContextType } from "../context/authProvider";

const useAuth = (): AuthContextType => {
    return useContext(AuthContext);
}

export default useAuth;