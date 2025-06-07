import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '@Api/apiService'; // <-- Import the login function

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load user from localStorage if present
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Keep localStorage in sync with user state
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    const userData = await loginUser(email, password);
    if (userData) {
      setUser(userData);
      // localStorage is updated by useEffect
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}