import { useContext, useEffect, useState } from "react";

import ChatContact from "../small/ChatContact";

import AuthContext from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";

import type { ChatContactType } from "../../misc/types";

export default function ContactList() {
    const [contactList, setContactList] = useState<ChatContactType[]>([]);

    const { socket } = useContext(SocketContext);

    const { state } = useContext(AuthContext)

    useEffect(() => {
        socket.emit("chatList", state.userId);

        socket.on('updateChatList', response => {
            setContactList(response);
            // send the socket server to join all the rooms
        })

        return () => {
            socket.emit('chatList');
        }

    }, [socket])

    const chatsLoading = contactList.length === 0;

    return (
        <>
            { chatsLoading ?
                <div className=" mt-[50%] mx-auto text-center">
                    <span className="loading loading-spinner loading-lg text-white text-center "></span>
                </div>
                :
                contactList.map((ele, i) => {
                    return <ChatContact { ...ele } selfUserId={ state.userId } key={ i } />
                })
            }
        </>
    )
}