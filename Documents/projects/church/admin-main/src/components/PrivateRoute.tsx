import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { currentUser } = useAuth();

    // Redirect to sign-in if not authenticated
    if (!currentUser) {
        return <Navigate to="/sign-in" />;
    }

    // Render children if authenticated
    return <>{children}</>;
};

export default PrivateRoute;