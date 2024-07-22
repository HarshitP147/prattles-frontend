import { useContext, useEffect, useMemo, useState } from "react";

import ChatContact from "../small/ChatContact";

import AuthContext from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";

import type { ChatContactType } from "../../misc/types";

export default function ContactList() {
    const [chatsLoading, setChatsLoading] = useState(true);

    const [contactList, setContactList] = useState<ChatContactType[]>([]);

    const { socket } = useContext(SocketContext);

    const { state } = useContext(AuthContext)

    useEffect(() => {
        socket.emit("chatList", state.userId, (response: ChatContactType[]) => {
            setContactList(response)
            setChatsLoading(false);
        })

        return () => {
            socket.removeListener('chatList');
        }
    }, [contactList, state.userId])

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