import { LoaderFunctionArgs } from "react-router-dom";
import type { ChatsType } from "./types";

async function chatLoader({ params }: LoaderFunctionArgs): Promise<ChatsType> {
    console.log(params.chatId);
    const userChats = await (await fetch(`http://localhost:8080/chat/${params.chatId}`)).json()
    return userChats;
}
export default chatLoader;