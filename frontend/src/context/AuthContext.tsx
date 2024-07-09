import { createContext, useContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import type { User } from "../types/types";
import { loginApi, registerApi } from "../services/api";
import { useNavigate } from "react-router-dom";

// Define the AuthContextValue interface extending the State interface with additional methods
interface AuthContextType {
  user: User | null;
  login: (fname: string, password: string) => Promise<void>;
  loading: boolean;
  logout: () => void;
  register: (fname: string, lname: string, email: string, number: string) => void;
  error?: any;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) setError(null); //reset error when user switches page
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setError(null);
    navigate("/login");
  };

  const login = async (fname: string, password: string) => {
    setLoading(true);
    try {
      const res = await loginApi(fname, password);
      if (res.ok) {
        const jsonRes = await res.json();
        localStorage.setItem("access_token", jsonRes.token);
        setUser(jsonRes.user);
        setError(null);
      } else {
        const errorData = await res.json();
        setError({ type: "login", message: errorData.message });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError({ type: "login", message: "An unexpected error occurred." });
    }
    setLoading(false);
  };

  const register = async (fname: string, lname: string, email: string, number: string) => {
    setLoading(true);
    try {
      const res = await registerApi(fname, lname, email, number);
      if (res.ok) {
        alert("Registration successful, Your password has been sent and it may go to your spam folder.");
        setError(null);
      } else {
        const errorData = await res.json();
        setError({ type: "register", message: errorData.message });
      }
    } catch (error) {
      console.error("Error registering:", error);
      setError({ type: "register", message: "An unexpected error occurred." });
    }
    setLoading(false);
  };

  const value: AuthContextType = {
    login,
    logout,
    register,
    loading,
    user,
    error,
    setUser,
  };
  //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
