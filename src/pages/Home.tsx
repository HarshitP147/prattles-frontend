import { useEffect, useCallback, } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import UserCard from "../components/medium/UserCard";
import ContactList from "../components/medium/ContactList";

import SocketProvider from "../context/SocketContext";


export default function Home() {
    const navigate = useNavigate();

    const handleEscape = useCallback((ev: KeyboardEvent) => {
        if (ev.key === "Escape") {
            navigate("/chat");
        }
    }, [navigate])


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
                    <ContactList />
                </div>
                <div className="flex-grow">
                    <Outlet />
                </div>
            </div>
        </SocketProvider>
    )
}