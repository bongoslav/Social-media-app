import { createContext, useState } from "react";

type AuthContextType = {
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
} | null;

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string>("");

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
