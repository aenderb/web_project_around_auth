import { Navigate } from "react-router-dom";

function PublicRoute({ isLoggedIn, children }) {
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}

export default PublicRoute;
