import { useContext, useEffect, useState, } from "react";

import ChatContact from "../components/ChatContact";
import UserCard from "../components/UserCard";

import { SocketContext } from "../context/SocketContext";

import type { ChatType } from "../type";

export default function Chat() {
    const { socket } = useContext(SocketContext);

    const [chatList, setChatList] = useState<ChatType[]>([]);
    const [name, setName] = useState<string>('')

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        fetch(`http://localhost:8080/user/${userId}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(async data => {
                sessionStorage.setItem("imageUrl", data.profileUrl);
                setName(data.name);
                setChatList(data.chats);
            })
    }, [])

    useEffect(() => {
        socket.on('updateChat', chatContactList => setChatList(chatContactList))

        return () => {
            socket.off('updateChat');
        }
    })

    return (
        <main className="flex flex-row ">
            <div className="h-[100vh] w-[22em] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#ffffff] scrollbar-track-[#1a1a1a] ">
                <UserCard name={ name } />
                { chatList.map((ele, i) => {
                    console.dir(ele);
                    return <ChatContact key={ i } />
                }) }
            </div>
            <section className="">
            </section>
        </main>
    )
}