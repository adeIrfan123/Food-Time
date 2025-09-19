import { Navigate, useLocation } from "react-router";

export const AdminPrivateRoute = ({ element }) => {
  const token = localStorage.getItem("admin_token");
  return token ? element : <Navigate to="/admin/login" />;
};

export const UserPrivateRoute = ({ element }) => {
  const token = localStorage.getItem("user_token");
  return token ? element : <Navigate to="/login" />;
};

export const PreventAuthRoute = ({ element }) => {
  const location = useLocation();

  const isAdmin = !!localStorage.getItem("admin_token");
  const isUser = !!localStorage.getItem("user_token");
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdmin && isAdminRoute) {
    return <Navigate to="/admin" replace />;
  }

  if (isUser && !isAdminRoute) {
    return <Navigate to="/" replace />;
  }

  return element;
};
