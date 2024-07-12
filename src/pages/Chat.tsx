import { useState, useContext } from "react";
import { useParams, useLoaderData } from "react-router-dom";


import InputBox from "../components/small/InputBox";
import Messages from "../components/layout/Messages";

import { SocketContext } from "../context/SocketContext";

import type { ChatMessagesType } from "../misc/types";

export async function loader({ params }) {

    const getMessages = fetch(`http://localhost:8080/chat/${params.chatId}`)
        .then(res => res.json())


    return getMessages;
}


export default function Chat() {
    const { chatId } = useParams<string>();

    const [message, setMessage] = useState('');

    const { socket } = useContext(SocketContext);

    const chatMessages = useLoaderData() as ChatMessagesType;

    function sendMessage() {
        const messageInfo = {
            sender: sessionStorage.getItem("userId"),
            chatId: chatId,
            content: {
                text: message
            }
        }

        socket.emit('chat', messageInfo);
    }

    return (
        <>
            <div className="flex flex-col h-[100vh]   ">
                <div className=" overflow-y-scroll scrollbar-thin scrollbar-thumb-accent scrollbar-track-primary  h-full">
                    <Messages chatId={ chatId } messages={ chatMessages } />
                </div>
                <div className="">
                    <InputBox message={ message } setMessage={ setMessage } sendMessage={ sendMessage } />
                </div>
            </div>
        </>
    )
}