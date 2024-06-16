import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import App from "./App";

import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import DefaultChat from "./pages/DefaultChat";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={ <App /> }>
        <Route path="/" element={ <Auth /> } />

        <Route path="/chat" element={ <Chat /> } >
            <Route index={ true } element={ <DefaultChat /> } />
            <Route path=":chatId" />
        </Route>
    </Route>
))
export default router;