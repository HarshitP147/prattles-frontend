import { BsImageFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

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
        <div className="input input-primary  rounded-md w-[55%] h-fit px-0  mx-auto  flex bg-base-content border">

            <button className=" my-auto text-white p-[1rem] tooltip  transition-colors  " data-tip="Images are not supported yet" >
                <BsImageFill className="scale-150" />
            </button>

            <input type="text" value={ props.message } onChange={ e => props.setMessage(e.target.value) } placeholder="Message here" className=" w-full px-2    text-white" />
            <AnimatePresence>
                { !buttonDisabled && (
                    <motion.button
                        onClick={ props.sendMessage }
                        initial={ { opacity: 0, } }
                        animate={ { opacity: 1, } }
                        exit={ { opacity: 0, } }
                        transition={ { ease: "circInOut", duration: 0.2 } }
                        className="my-auto mr-4 scale-150 transition-colors  text-base-300 hover:text-white "
                    >
                        <IoSend className="" />
                    </motion.button>
                ) }
            </AnimatePresence>

        </div>
    )
}