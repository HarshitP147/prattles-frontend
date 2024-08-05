import { memo } from "react";
import { NavLink } from "react-router-dom";

import type { ChatContactType } from "../../misc/types"

const ChatContact = memo((props: ChatContactType) => {
    const chatId = props.chatId

    const name = props.participants[0].name
    const avatarUrl = props.participants[0].avatarUrl

    return (
        <NavLink to={ `/chat/${chatId}` } className={ ({ isActive, isPending, }) =>
            `transition border border-x-0 border-zinc-600 px-5 py-4 flex items-center
            ${isPending ? 'bg-base-100' : isActive ? 'bg-info  hover:bg-none' : 'hover:bg-zinc-800'}` }
        >
            <img src={ avatarUrl } alt={ `${name}'s profile picture` } className="rounded-full h-[4.5em] w-[4.5em]" />
            <div className="ml-6 w-full overflow-hidden ">
                <h1 className="text-accent-content text-2xl">{ name }</h1>
            </div>
        </NavLink>
    )
})
export default ChatContact