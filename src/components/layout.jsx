import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/auth.context";

const Layout = () => {
  return (
    <AuthProvider>
      <NavBar />
      <div className="app">
        <Outlet />
      </div>
    </AuthProvider>
  );
};
export default Layout;
