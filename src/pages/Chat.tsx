import { useState } from "react";
import { useParams } from "react-router-dom"

import InputBox from "../components/small/InputBox"
import Messages from "../components/layout/Messages";

export default function Chat() {
    const { chatId } = useParams()

    const [message, setMessage] = useState('');

    function sendMessage() {

    }

    return (
        <>
            <main className="border h-full">
                <section className="border pt-8 border-blue-800 h-[10%] overflow-visible">
                    <Messages chatId={ chatId } />
                </section>
                <div className="relative mx-auto w-full z-10 top-2">
                    <InputBox message={ message } setMessage={ setMessage } sendMessage={ sendMessage } />
                </div>
            </main>
        </>
    )
}