import { Dispatch, SetStateAction } from "react";
import { BsImageFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

interface InputBoxProps {
    message: string,
    setMessage: Dispatch<SetStateAction<string>>,
    sendMessage: () => void
}

export default function InputBox(props: InputBoxProps) {
    let buttonDisabled = true

    buttonDisabled = props.message.length ? false : true;


    return (
        <div className="input rounded-none absolute bottom-0 z-20 px-0 flex items-center w-full bg-base-content ">

            <button className="h-[60%] w-auto ml-4 -mr-2">
                <BsImageFill className="h-full w-auto text-white" />
            </button>
            <div className="divider-neutral divider divider-horizontal " />
            <input type="text" placeholder="Type your messge here..." value={ props.message } onChange={ e => props.setMessage(e.target.value) } className="flex-grow h-full text-white -ml-2 mr-2 px-2 border border-zinc-700" />
            <button disabled={ buttonDisabled } onClick={ props.sendMessage } className="w-fit h-full transition-colors text-white hover:bg-white hover:text-black p-2 disabled:bg-zinc-800 disabled:text-gray-300  ">
                <IoSend className=" h-full w-full " />
            </button>

        </div>
    )
}