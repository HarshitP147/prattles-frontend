import type { ChatType } from "../type"

export default function ChatContact(props: ChatType) {

    return (
        <div className="flex justify-between items-center transition-colors cursor-pointer py-4 px-8 h-fit border border-x-0 border-y-neutral hover:bg-info text-white">
            <div className="avatar h-14 w-14 border">
                <img src={ props.participants[0].avatarUrl } alt="" className="rounded-full" />
            </div>
            <div className="flex flex-col border ">

                <h1>{ props.participants[0].name }</h1>

                <h1>{ props.lastMessage.content[0].text }</h1>

            </div>
        </div>
    )
}