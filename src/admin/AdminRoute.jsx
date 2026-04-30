import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loadingUser } = useContext(AuthContext);

  if (loadingUser) return <div className="text-center mt-20">Loading...</div>;

  if (!user || !user.isAdmin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default AdminRoute;
