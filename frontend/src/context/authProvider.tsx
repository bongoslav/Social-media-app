import { createContext, useState, ReactNode } from "react";

export type AuthData = {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
}

export type AuthContextType = {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthData>({
    userId: "",
    email: "",
    username: "",
    accessToken: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
