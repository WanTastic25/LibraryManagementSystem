import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ requiredRole }) => {
  const token = sessionStorage.getItem("token");
  if (!token) return <Navigate to="/" />;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const exp = payload.exp * 1000;
  const now = Date.now();

  if (now > exp) {
    sessionStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/login" />;
    }
  }

  return <Outlet />;
}

export default PrivateRoute