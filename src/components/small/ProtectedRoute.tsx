import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

// if not authenticated, protect the routes

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { state } = useContext(AuthContext);
    if (state.userId.length === 0) {
        return <Navigate to="/auth" replace={ true } />
    }

    return children;
}