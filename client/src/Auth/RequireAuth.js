import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthProvider";

const RequireAuth = ({ allowedRole }) => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return auth?.role === allowedRole ? (
        <Outlet />
    ) : auth?.username ? (
        <Navigate to="/unauthorized" replace />
    ) : (
        <Navigate to="/users/login" replace state={{ from: location }} />
    );
};

export default RequireAuth;
