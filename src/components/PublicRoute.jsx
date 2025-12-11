import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }){
    const token = localStorage.getItem("token");
    console.log("Token in public route FE",token)
    if(token){
        return <Navigate to="/home" replace />;
    }

    return children;
}