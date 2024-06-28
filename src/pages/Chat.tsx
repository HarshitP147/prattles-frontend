import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom"

import InputBox from "../components/InputBox";

import { SocketContext } from "../context/SocketContext";

import type { ChatsType } from '../misc/types'


export default function Chat() {
    const [message, setMessage] = useState('');
    const { socket } = useContext(SocketContext)

    const { messages } = useLoaderData() as ChatsType;

    function sendMessage() {
        socket.emit('message',)
    }

    return (
        <>
            <div className="mt-10 border">
                { messages.map((msg, i) => {
                    const isMyMessage = msg.sender.userId === sessionStorage.getItem("userId")
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