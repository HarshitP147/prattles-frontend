import { NavLink } from "react-router-dom";

import type { ChatContactType } from "../../misc/types"

export default function ChatContact(props: ChatContactType) {
    const chatId = props.chatId

    const name = props.participants[0].name
    const avatarUrl = props.participants[0].avatarUrl

    const isLastMessageSelfSent = props.lastMessage.sender.userId === sessionStorage.getItem("userId");

    return (
        <NavLink to={ `/chat/${chatId}` } className={ ({ isActive, isPending, }) =>
            `transition border border-x-0 border-neutral px-5 py-4 flex items-center
        ${isPending ? 'bg-[#235c95]' : isActive ? 'bg-secondary hover:bg-none' : 'hover:bg-zinc-800'}` }
        >
            <img src={ avatarUrl } alt={ `${name}'s profile picture` } className="rounded-full h-[4.5em] w-[4.5em]" />
            <div className="ml-6 w-full overflow-hidden ">
                <h1 className="text-base-100 text-2xl">{ name }</h1>
                <span className="text-base-100 ">
                    { isLastMessageSelfSent &&
                        <span className="text-base-100 text-sm font-bold mr-1">You:</span>
                    }
                    <span className="whitespace-nowrap text-sm  " >{ props.lastMessage.content.text }</span>
                </span>
            </div>
        </NavLink>
    )
}