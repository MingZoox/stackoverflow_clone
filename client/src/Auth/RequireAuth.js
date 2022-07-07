import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthProvider";

const RequireAuth = ({ allowedRole }) => {
    const { auth } = useContext(AuthContext);

    return (
        auth &&
        (auth?.role === allowedRole ? (
            <Outlet />
        ) : (
            auth?._id && <Navigate to="/unauthorized" replace />
        ))
    );
};

export default RequireAuth;
