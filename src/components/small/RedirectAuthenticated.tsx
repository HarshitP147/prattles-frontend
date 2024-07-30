import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

// if authenticated, redirect to home page

export default function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
    const { state } = useContext(AuthContext);
    if (state.userId.length !== 0) {
        return <Navigate to="/chat" replace={ true } />;
    }
    return children
}