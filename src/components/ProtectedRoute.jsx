import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // if no token -> redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // checking if the token is expired
  if (!isTokenValid()) {
    localStorage.removeItem("token"); 
    return <Navigate to="/login" replace />;
  }

  // if token exists --> show the protected component
  return children;
}

function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime; // true if not expired
  } catch (err) {
    return false; // invalid token
  }
}
