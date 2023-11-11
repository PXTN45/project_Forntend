import { useContext, createContext, useState, useEffect } from "react";
import AuthService from "../services/auth.service";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUsers()); // เรียกใช้ getUsers() ตรงนี้

  const login = (user) => setUser(user);
  const logout = () => {
    AuthService.logout(); // ควรเรียกใช้ฟังก์ชัน logout ด้วย ()
    setUser(null);
  };

  function getUsers() {
    const temp = localStorage.getItem("user");
    const savedUser = JSON.parse(temp);
    return savedUser || null;
  }

  useEffect(() => {
    const temp = JSON.stringify(user);
    localStorage.setItem("user", temp);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
