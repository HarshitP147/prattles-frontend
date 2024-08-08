import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";

import App from "../App";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import NoChatPage from "../pages/NoChatPage";
import Error from "../pages/Error";

import chatListLoader from "./chatListLoader";

import ProtectedRoute from "../components/small/ProtectedRoute";
import RedirectIfAuthenticated from "../components/small/RedirectAuthenticated";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <App /> } errorElement={ <Error /> } >
        <Route path="/auth" element={ <RedirectIfAuthenticated children={ <Auth /> } /> } />

        <Route path="/chat" element={ <ProtectedRoute children={ <Outlet /> } /> } >
            <Route element={ <Home /> }>
                <Route index={ true } element={ <NoChatPage /> } />
                <Route path=":chatId" element={ <Chat /> } loader={ chatListLoader } />
            </Route>
        </Route >
    </Route>
))
export default router;
