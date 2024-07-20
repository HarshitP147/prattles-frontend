import { useEffect, useState, useCallback, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import ChatContact from "../components/medium/ChatContact";
import UserCard from "../components/medium/UserCard";
// import InputBox ̥̥from "../components/small/InputBox";

import SocketProvider, { SocketContext } from "../context/SocketContext";
import AuthContext from "../context/AuthContext";

import type { ChatContactType } from "../misc/types";

export default function Home() {
    const { socket } = useContext(SocketContext);
    const { state } = useContext(AuthContext);

    const [contactList, setContactList] = useState<ChatContactType[]>([]);
    const [chatsLoading, setChatsLoading] = useState(true);;

    const navigate = useNavigate();

    const handleEscape = useCallback((ev: KeyboardEvent) => {
        if (ev.key === "Escape") {
            navigate("/chat");
        }
    }, [navigate])

    useEffect(() => {

        console.log(state);
    })


    useEffect(() => {
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        }
    }, [handleEscape])


    return (
        <SocketProvider>
            <div className="flex flex-row items-stretch h-full ">
                <div className="h-[100vh] w-[22em] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary border-r border-r-base-300 ">
                    <UserCard />
                    { chatsLoading ?
                        <div className=" mt-[50%] mx-auto text-center">
                            <span className="loading loading-spinner loading-lg text-white text-center "></span>
                        </div>
                        :
                        contactList.map((ele, i) => {
                            return <ChatContact { ...ele } key={ i } />
                        })
                    }
                </div>
                <div className="flex-grow">
                    <Outlet />
                </div>
            </div>
        </SocketProvider>
    )
}