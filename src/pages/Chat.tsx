import { useState } from "react";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom"

import InputBox from "../components/InputBox";

export async function loader({ params }: LoaderFunctionArgs<any>): Promise<any> {
    const userChats = await (await fetch(`http://localhost:8080/chat/${params.chatId}`)).json()
    return userChats;
}

export default function Chat() {
    const [message, setMessage] = useState('');

    const data = useLoaderData();

    function sendMessage() {
        console.log(data);
    }

    return (
        <>

            <InputBox message={ message } setMessage={ setMessage } sendMessage={ sendMessage } />
        </>
    )
}