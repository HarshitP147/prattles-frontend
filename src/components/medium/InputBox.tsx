import { KeyboardEvent, useCallback } from "react";
// import { BsImageFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

import type { InputBoxProps } from "../../misc/types";

export default function InputBox(props: InputBoxProps) {

    const handleEnterPress = useCallback((ev: KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === 'Enter') {
            if (props.message !== '') {
                props.sendMessage();
            }
        }
    }, [props])


    const buttonDisabled = props.message.length || props.sending ? false : true;

    return (
        <div className=" rounded-md w-[55%] h-fit px-0 outline-none  focus:outline-dashed  mx-auto flex bg-primary-content border border-neutral-content">

            {/* <button className=" my-auto text-white p-[1rem] tooltip  transition-colors  " data-tip="Images are not supported yet" >
                <BsImageFill className="scale-150" />
            </button> */}

            <input type="text" value={ props.message } onChange={ e => props.setMessage(e.target.value) } onKeyDown={ handleEnterPress } placeholder="Message here" className="flex-1  rounded-xl px-2 py-4  bg-primary-content focus:border-none focus:outline-none  text-white" />
            <AnimatePresence>
                { !buttonDisabled && (
                    <motion.button
                        onClick={ props.sendMessage }
                        initial={ { opacity: 0, } }
                        animate={ { opacity: 1, } }
                        exit={ { opacity: 0, } }
                        transition={ { ease: "circInOut", duration: 0.2 } }
                        className="my-auto mr-4 scale-150 transition-colors  text-neutral-300  hover:text-white "
                    >
                        { props.sending ?
                            <span className="loading loading-dots w-3 " />
                            :
                            <IoSend />
                        }
                    </motion.button>
                ) }
            </AnimatePresence>
        </div>
    )
}