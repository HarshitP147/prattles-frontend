import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import App from "../App";

import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import NoChatPage from "../pages/NoChatPage";

import chatListLoader from "./chatListLoader";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={ <App /> }>
        <Route path="/" element={ <Auth /> } />

        <Route path="/chat" element={ <Home /> } >
            <Route index={ true } element={ <NoChatPage /> } />
            <Route path=":chatId" element={ <Chat /> } loader={ chatListLoader } />
        </Route>
    </Route>
))
export default router;
