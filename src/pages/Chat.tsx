import { useState, useContext, useEffect, useCallback } from "react";
import { useLoaderData, useParams } from "react-router-dom"

import InputBox from "../components/InputBox";

import { SocketContext } from "../context/SocketContext";

import { ChatsType } from "../misc/types";


export default function Chat() {
    const [message, setMessage] = useState('');
    const { socket } = useContext(SocketContext)

    const userId = sessionStorage.getItem('userId');

    const { messages } = useLoaderData() as ChatsType;
    const chatId = useParams()

    useEffect(() => {
        socket.emit("joinRoom", chatId);

        return () => {
            socket.emit("leaveRoom", chatId);
        }
    }, [chatId, socket])

    const sendMessage = useCallback(() => {
        const messageInfo = {
            chatId: chatId,
            content: {
                text: message
            },
            sender: userId
        }

        socket.emit('message', messageInfo);

        setMessage('');
    }, [message, userId, chatId, socket]);

    useEffect(() => {
        const pressEnter = (e: { key: string; }) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        };

        window.addEventListener('keydown', pressEnter);

        return () => {
            window.removeEventListener('keydown', pressEnter);
        }
    }, [sendMessage])

    return (
        <>
            <div className="mt-10 border">
                { messages.map((msg, i) => {
                    const isMyMessage = msg.sender.userId === userId
                    return (
                        <div key={ i } className={ `chat ${isMyMessage ? 'chat-end' : 'chat-start'}` }>
                            <div className={ `chat-bubble ${isMyMessage ? 'chat-bubble-secondary' : 'chat-bubble-success'} ` }>
                                <span>{ msg.content.text }</span>
                            </div>
                            <span className="chat-footer text-base-300 text-xs">Status</span>
                        </div>
                    )
                }) }
            </div>
            <InputBox message={ message } setMessage={ setMessage } sendMessage={ sendMessage } />
        </>
    )
}