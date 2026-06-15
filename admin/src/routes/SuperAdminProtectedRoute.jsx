import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SuperAdminProtectedRoute = ({
    children,
}) => {
    const {
        user,
        loading,
    } = useAuth();

    if (loading) {
        return (
            <div
                className="
        min-h-screen
        flex
        items-center
        justify-center
        "
            >
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    if (
        user.role !==
        "super_admin"
    ) {
        return (
            <Navigate
                to="/admin/dashboard"
                replace
            />
        );
    }

    return children;
};

export default SuperAdminProtectedRoute;