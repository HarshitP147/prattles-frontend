import type { ChatType } from "../type"

export default function ChatContact(props: ChatType) {
    const { chatId } = props;

    return (
        <div className="transition-colors cursor-pointer hover:bg-info hover:text-black text-white h-20">
            <h1>Your chat here</h1>
            {/* <h1 className="">Chat id:{ chatId }</h1> */ }
        </div>
    )
}