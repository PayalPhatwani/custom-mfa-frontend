import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const token = localStorage.getItem("token");

    // if no token -> redirect to login
    if(!token){
        return <Navigate to="/login" replace />;
    }

    // if token exists --> show the protected component
    return children
}