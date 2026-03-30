import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api.js";

axios.defaults.withCredentials = true;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/profile`);
        setUser(response.data.user);
      } catch (err) {
        if (err.response?.status != 401) {
          console.error("Unexpected error:", err);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
