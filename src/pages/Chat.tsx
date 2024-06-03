import { useEffect, useState } from "react";

import ChatList from "../components/ChatList";

const imageUrltoBase64 = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob()
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob)
        reader.onload = () => {
            const base64data = reader.result;
            resolve(base64data);
        };
        reader.onerror = reject
    })
}


const arr = [...Array(100).keys()]

export default function Chat() {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {

        if (!localStorage.getItem('userId')) {
            let userId = localStorage.getItem("userId");
            fetch(`http://localhost:8080/user/${userId}`, {
                method: "GET",
            })
                .then(res => res.json())
                .then(async data => {
                    // data.profileUrl -> this contains the image URL

                    const imageString = await imageUrltoBase64(data.profileUrl)!

                    localStorage.setItem("imageUrl", imageString);

                    setChatList(data.chats);
                })
        }


    }, [])



    return (
        <main className="flex flex-row ">
            <div className="h-[100vh] w-[20em] overflow-y-scroll">
                { arr.map((ele, i) => {
                    return <h1 className="text-info">The chat person will come here</h1>
                }) }
                {/* <ChatList chatList={ chatList } /> */ }
            </div>
            <div className="divider " />
            <section className="">
                <h1 className="text-secondary text-[1.5em]">This is the actual section where the chats come in</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </section>
        </main>
    )
}