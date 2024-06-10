import { useContext, useEffect, useState, } from "react";

import ChatContact from "../components/ChatContact";
import UserCard from "../components/UserCard";

import { SocketContext } from "../context/SocketContext";

// const arr = [...Array(100).keys()]

export default function Chat() {
    const { socket } = useContext(SocketContext);

    const [chatList, setChatList] = useState<any[]>([]);
    const [name, setName] = useState<string>('')

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            const userId = localStorage.getItem("userId");
            fetch(`http://localhost:8080/user/${userId}`, {
                method: "GET",
            })
                .then(res => res.json())
                .then(async data => {
                    // data.profileUrl -> this contains the image URL

                    localStorage.setItem("imageUrl", data.profileUrl);

                    setName(data.name);

                    setChatList(data.chats);
                })
        }
    }, [])

    useEffect(() => {
        socket.on('updateChat', chats => {
            setChatList(chats);
        })
    }, [socket]);

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