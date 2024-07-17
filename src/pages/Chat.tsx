import { useState, useContext, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";


import InputBox from "../components/small/InputBox";
import Messages from "../components/layout/Messages";

import { SocketContext } from "../context/SocketContext";

import type { ChatLoaderType, MessageType } from "../misc/types";

export default function Chat() {
    const { chatId } = useParams<string>();

    const data = useLoaderData() as ChatLoaderType;

    const [message, setMessage] = useState('');
    const [chatList, setChatList] = useState<MessageType[]>();

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        setChatList(data.messages);

        return () => {
            setChatList([]);
        }
    }, [data])

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
            <div className="flex flex-col h-[100vh]  px-12 py-8 ">
                <div className=" overflow-y-scroll scrollbar-thin scrollbar-thumb-accent scrollbar-track-primary  h-full">
                    <Messages chatId={ chatId } messages={ chatList } />
                </div>
                <div>
                    <InputBox message={ message } setMessage={ setMessage } sendMessage={ sendMessage } />
                </div>
            </div>
        </>
    )
}