import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import App from "./App";

import Auth from "./pages/Auth";
import Chat from "./pages/Chat";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={ <App /> }>
        <Route path="/" element={ <Auth /> } />

        <Route path="/chat" element={ <Chat /> }>

        </Route>
    </Route>
))
export default router;