import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("jwt-auth");
  const storedUser = localStorage.getItem("usuario");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (
    requiredRole &&
    user.rol &&
    user.rol.toUpperCase() !== requiredRole.toUpperCase()
  ) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
