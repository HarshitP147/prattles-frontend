import { useEffect, useState, useCallback, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import ChatContact from "../components/medium/ChatContact";
import UserCard from "../components/medium/UserCard";

import { SocketContext } from "../context/SocketContext";

import type { ChatContactType } from "../misc/types";
import InputBox from "../components/small/InputBox";

const userId = sessionStorage.getItem("userId");

export default function Home() {
    const { socket } = useContext(SocketContext);

    const [chatList, setChatList] = useState<ChatContactType[]>([]);
    const [name, setName] = useState<string>('')
    const [chatsLoading, setChatsLoading] = useState(true);;

    const navigate = useNavigate();

    const handleEscape = useCallback((ev: KeyboardEvent) => {
        if (ev.key === "Escape") {
            navigate("/chat");
        }
    }, [navigate])

    useEffect(() => {
        fetch(`http://localhost:8080/user/${userId}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(async data => {
                sessionStorage.setItem("imageUrl", data.profileUrl);
                setName(data.name);
            })
    }, [])

    useEffect(() => {
        socket.emit('chatList', userId, (response: ChatContactType[]) => {
            setChatList(response);
            setChatsLoading(false);
        })

        return () => {
            socket.off('chatList');
        }
    }, [socket])

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        }
    }, [handleEscape])


    return (
        <div className="flex flex-row items-stretch h-full ">
            <div className="h-[100vh] w-[22em] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#ffffff] scrollbar-track-[#1a1a1a] border-r">
                <UserCard name={ name } />
                { chatsLoading ?
                    <div className=" mt-[50%] mx-auto text-center">
                        <span className="loading loading-spinner loading-lg text-white text-center "></span>
                    </div>
                    :
                    chatList.map((ele, i) => {
                        return <ChatContact { ...ele } key={ i } />
                    })
                }
            </div>
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    )
}