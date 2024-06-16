import { NavLink } from "react-router-dom";

import type { ChatType } from "../type"

export default function ChatContact(props: ChatType) {

    const chatId = props.chatId

    let name = props.lastMessage.sender.name
    let avatarUrl = props.lastMessage.sender.avatarUrl

    const isLastMessageSelfSent = props.lastMessage.sender.userId === sessionStorage.getItem("userId");

    if (!isLastMessageSelfSent) {
        name = props.participants[0].name;
        avatarUrl = props.participants[0].avatarUrl;
    }

    return (
        <NavLink to={ `/chat/${chatId}` } className="transition hover:bg-info hover:border-none border border-x-0 border-neutral px-5 py-4 flex items-center ">
            <img src={ avatarUrl } alt={ `${name}'s profile picture` } className="rounded-full h-[4.5em] w-[4.5em]" />
            <div className="ml-6 w-full overflow-hidden ">
                <h1 className="text-base-100 text-2xl">{ name }</h1>
                <span className="text-base-100 ">
                    { isLastMessageSelfSent &&
                        <span className="text-base-100 text-sm font-bold mr-1">You:</span>
                    }
                    <span className="whitespace-nowrap text-sm  " >{ props.lastMessage.content[0].text }</span>
                </span>
            </div>
        </NavLink>
    )
}