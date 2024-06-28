import { useContext, useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import ChatContact from "../components/ChatContact";
import UserCard from "../components/UserCard";

import { SocketContext } from "../context/SocketContext";

import type { ChatContactType } from "../misc/types";

export default function Home() {
    const { socket } = useContext(SocketContext);

    const [chatList, setChatList] = useState<ChatContactType[]>([]);
    const [name, setName] = useState<string>('')

    const navigate = useNavigate();

    const handleEscape = useCallback((ev: KeyboardEvent) => {
        if (ev.key === "Escape") {
            navigate("/chat");
        }
    }, [navigate])

    useEffect(() => {
        socket.on('updateChat', chatContactList => setChatList(chatContactList))

        return () => {
            socket.off('updateChat');
        }
    })

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
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        }
    }, [handleEscape])


    return (
        <div className="flex flex-row items-stretch">
            <div className="h-[100vh] w-[22em] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#ffffff] scrollbar-track-[#1a1a1a] border-r">
                <UserCard name={ name } />
                { chatList.map((ele, i) => {
                    return <ChatContact { ...ele } key={ i } />
                }) }
            </div>
            <main className="flex-grow relative">
                <Outlet />
            </main>
        </div>
    )
}