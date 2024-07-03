import { createContext, useContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import type { User } from "../types/types";
import { loginApi, registerApi } from "../services/api";

// Define the AuthContextValue interface extending the State interface with additional methods
interface AuthContextType {
  user: User | null;
  login: (fname: string, password: string) => Promise<void>;
  loading: boolean;
  logout: () => void;
  register: (fname: string, lname: string, email: string, number: number) => Promise<boolean>;
  error?: any;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) setError(null); //reset error when user switches page
  }, [location.pathname]);

  const logout = () => {
    setUser(null);
  };

  const login = async (fname: string, password: string) => {
    setLoading(true);
    try {
      const userObj = await loginApi(fname, password);
      if (userObj) setUser(userObj);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  const register = async (fname: string, lname: string, email: string, number: number) => {
    setLoading(true);
    let isRegistrationSuccess = false;
    try {
      isRegistrationSuccess = await registerApi(fname, lname, email, number);
      if (isRegistrationSuccess) alert("Registration Success!, Access you password in you email inbox");
    } catch (error) {
      setError(error);
    }
    setLoading(false);
    return isRegistrationSuccess;
  };

  const value: AuthContextType = {
    login,
    logout,
    register,
    loading,
    user,
    setUser,
  };
  //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
