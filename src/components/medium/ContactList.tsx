import { useContext, useEffect, useState } from "react";

import ChatContact from "../small/ChatContact";

import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";

import type { ChatContactType } from "../../misc/types";

export default function ContactList() {
    const [contactList, setContactList] = useState<ChatContactType[] | null>(null);

    const { socket } = useContext(SocketContext);

    const { state } = useContext(AuthContext)

    useEffect(() => {
        socket.emit("chatList", state.userId);

        socket.on('updateChatList', response => {
            setContactList(response);
        })

        return () => {
            socket.emit('chatList');
        }

    }, [socket, state.userId])

    const chatsLoading = contactList === null;

    return (
        < >
            { chatsLoading ?
                <div className=" mt-[50%] mx-auto text-center">
                    <span className="loading loading-spinner loading-lg text-white text-center "></span>
                </div>
                :
                contactList.length === 0 ?
                    <div className="my-[50%]  text-center">
                        <span className="text-zinc-400 text-[0.9em]  ">You have no contacts yet!</span>
                    </div>
                    :
                    contactList.map((ele, i) => {
                        return <ChatContact { ...ele } selfUserId={ state.userId } key={ i } />
                    })
            }
        </>
    )
}