
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData, navigate) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    if (userData.role === "teacher") navigate("/teacher");
    else if (userData.role === "admin") navigate("/admin");
  };

  const logout = (navigate) => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // ✅ redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

