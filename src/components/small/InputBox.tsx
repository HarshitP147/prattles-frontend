import { BsImageFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

import type { InputBoxProps } from "../../misc/types";

export default function InputBox(props: InputBoxProps) {
    let buttonDisabled = true

    buttonDisabled = props.message.length ? false : true;

    window.addEventListener("keypress", ev => {
        if (ev.key === "Enter") {
            props.sendMessage()
        }
    })

    return (
        <div className="input rounded-md px-0  flex bg-base-content">

            <div className="tooltip h-full ml-4 -mr-2 w-auto " data-tip="Adding images is not functional yet!">
                <BsImageFill className="h-full w-auto text-white" />
            </div>
            <div className="divider-neutral divider divider-horizontal " />
            <input type="text" placeholder="Type your messge here..." value={ props.message } onChange={ e => props.setMessage(e.target.value) } className="flex-grow h-full text-white -ml-2 mr-2 px-2 border border-zinc-700" />
            <button disabled={ buttonDisabled } onClick={ props.sendMessage }
                className="w-fit h-full transition-colors text-white hover:bg-white hover:text-black focus:bg-white focus:outline-none focus:text-black p-2 disabled:bg-zinc-800 disabled:text-gray-300 ">
                <IoSend className=" h-full w-full " />
            </button>

        </div>
    )
}