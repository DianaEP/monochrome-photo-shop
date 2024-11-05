import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({children}){
    const { isLoggedIn } = useContext(AuthContext)
    return isLoggedIn ? children : <Navigate to='/auth' />
}