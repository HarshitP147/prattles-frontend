import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion, useAnimate, useSpring, } from 'framer-motion'
import { HiUserAdd } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";

import NewUserDialog from "../layout/NewUserDialog";
import Logout from '../layout/Logout';

function showDialog(idName: string) {
    const ele = document.getElementById(idName)! as HTMLDialogElement;
    ele.showModal()
}

export default function Options() {
    const [optionsVisible, setOptionsVisible] = useState(true);

    const y1 = useSpring(0, {
        duration: 20
    });
    const y2 = useSpring(0, {
        duration: 10
    });

    const [optionScope, animate] = useAnimate();

    useEffect(() => {
        if (optionsVisible) {
            animate(optionScope.current, {
                rotate: '0deg'
            }, {
                duration: 0.1
            })

            y1.set(140)
            y2.set(70);

        } else {
            animate(optionScope.current, {
                rotate: '135deg'
            }, {
                duration: 0.1,
                ease: "linear"
            })

            y1.set(0);
            y2.set(0);
        }
    }, [optionsVisible, y1, y2, optionScope, animate])


    return (
        <>
            <div className="fixed flex flex-col left-64 bottom-20 z-20 ">
                <motion.div style={ { y: y1 } } exit={ { visibility: "hidden", opacity: 0 } } onClick={ () => showDialog('logoutModal') } className=" bg-red-600 rounded-full my-2  p-3 text-3xl transition  text-secondary-content hover:cursor-pointer hover:bg-red-500 ">
                    <IoMdLogOut />
                </motion.div>
                <motion.div style={ { y: y2 } } exit={ { visibility: "hidden", opacity: 0 } } onClick={ () => showDialog('newUserModal') } className=" bg-neutral rounded-full my-2  p-3 text-3xl transition  text-secondary-content hover:cursor-pointer hover:bg-base-100 ">
                    <HiUserAdd />
                </motion.div>
                <div ref={ optionScope } onClick={ () => setOptionsVisible(value => !value) } className=" bg-violet-700 rounded-full mt-2   p-3 text-3xl  transition  text-secondary-content hover:cursor-pointer hover:bg-violet-600 ">
                    <BsPlusLg />
                </div>
            </div >
            {
                createPortal(
                    <NewUserDialog />,
                    document.getElementById("modal-root")!
                )
            }
            {
                createPortal(
                    <Logout />,
                    document.getElementById('modal-root')!
                )
            }
        </>
    )
}