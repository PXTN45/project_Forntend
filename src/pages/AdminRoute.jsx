/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context";

const AdminRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  if (!user.roles.includes("ROLES_ADMIN")) return <Navigate to={"/notAllow"} />;
  return children;
};

export default AdminRoute;
