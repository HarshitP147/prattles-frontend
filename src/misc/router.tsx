import { useContext } from "react";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, Navigate } from "react-router-dom";

import App from "../App";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import NoChatPage from "../pages/NoChatPage";

import chatListLoader from "./chatListLoader";

import AuthContext from "../context/AuthContext";

// if not authenticated, protect the routes
const ProtectedRoute = () => {
    const { state } = useContext(AuthContext);
    console.log('Protected route');
    console.log(state);
    if (state.userId.length === 0) {
        return <Navigate to="/auth" replace={ true } />
    }

    return <Outlet />
}

// if authenticated, redirect to home page
const RedirectIfAuthenticated = () => {
    const { state } = useContext(AuthContext);
    console.log('Home route');
    console.log(state);
    if (state.userId.length !== 0) {
        return <Navigate to="/chat" replace={ true } />;
    }
    return <Auth />
};

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <App /> }>
        <Route path="/auth" element={ <RedirectIfAuthenticated /> } />

        <Route path="/chat" element={ <ProtectedRoute /> } >
            <Route element={ <Home /> }>
                <Route index={ true } element={ <NoChatPage /> } />
                <Route path=":chatId" element={ <Chat /> } loader={ chatListLoader } />
            </Route>
        </Route >
    </Route>
))
export default router;
