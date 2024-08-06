import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { m as motion } from "framer-motion";

import type { ChatContactType } from "../../misc/types"

const ChatContact = forwardRef((props: ChatContactType, ref) => {
    const chatId = props.chatId

    const name = props.participants[0].name
    const avatarUrl = props.participants[0].avatarUrl

    return (
        <motion.div
            ref={ ref }
        >
            <NavLink to={ `/chat/${chatId}` } className={ ({ isActive, isPending, }) =>
                `transition border border-x-0 border-zinc-600 px-5 py-4 flex items-center
        ${isPending ? 'bg-base-100' : isActive ? 'bg-info  hover:bg-none' : 'hover:bg-zinc-800'}` }
            >
                <img src={ avatarUrl } alt={ `${name}'s profile picture` } className="rounded-full h-[4.5em] w-[4.5em]" />
                <div className="ml-6 w-full overflow-hidden ">
                    <h1 className="text-accent-content text-2xl">{ name }</h1>
                </div>
            </NavLink>
        </motion.div>
    )
})
export default ChatContact