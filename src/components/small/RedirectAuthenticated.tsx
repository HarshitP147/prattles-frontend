import { useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

// if authenticated, redirect to home page

export default function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
    const { state } = useContext(AuthContext);

    const nav = useNavigate();

    if (state.userId.length !== 0) {
        nav("/chat");
    }
    return children
}