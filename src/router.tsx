import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import App from "./App";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Chat, { } from "./pages/Chat";
import DefaultChat from "./pages/DefaultChat";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={ <App /> }>
        <Route path="/" element={ <Auth /> } />

        <Route path="/chat" element={ <Home /> } >
            <Route index={ true } element={ <DefaultChat /> } />
            <Route path=":chatId" element={ <Chat /> } loader={ async ({ params }) => {

                const userChats = (await fetch(`http://localhost:8080/chat/${params.chatId}`)).json()

                const info = await Promise.resolve(userChats)

                return info;
                // return JSON.stringify(chatsInfo);
            } } />
        </Route>
    </Route>
))
export default router;