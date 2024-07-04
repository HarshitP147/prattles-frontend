import { LoaderFunctionArgs } from "react-router-dom";

import type { ChatsType } from "./types";

async function messageLoader({ params }: LoaderFunctionArgs): Promise<ChatsType> {
    const userChats = await (await fetch(`http://localhost:8080/message/${params.chatId}`)).json()
    return userChats;
}
export default messageLoader;