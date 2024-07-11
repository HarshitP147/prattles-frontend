import { useState } from "react";
import { useParams } from "react-router-dom";

import InputBox from "../components/small/InputBox";
import Messages from "../components/layout/Messages";

export default function Chat() {
    const { chatId } = useParams();

    const [message, setMessage] = useState('');

    function sendMessage() {

    }

    return (
        <>
            <div className="flex flex-col h-[100vh]   ">
                <div className=" overflow-scroll h-full">
                    <Messages chatId={ chatId } />
                </div>
                <div className="">
                    <InputBox message={ message } setMessage={ setMessage } sendMessage={ sendMessage } />
                </div>
            </div>
        </>
    )
}