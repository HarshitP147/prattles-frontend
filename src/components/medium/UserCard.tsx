import { useContext } from "react";
import { createPortal } from "react-dom";
import { HiUserAdd } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";


import NewUserDialog from "../layout/NewUserDialog";

import AuthContext from "../../context/AuthContext";

function showDialog() {
    const ele = document.getElementById('newUserModal')! as HTMLDialogElement;
    ele.showModal()
}


export default function UserCard() {
    const { state } = useContext(AuthContext);


    return (
        <>
            <div className="flex justify-evenly items-center py-4">
                <div className="avatar ">
                    <div className="w-14 rounded-full">
                        <img src={ state.imageUrl } />
                    </div>
                </div>

                <span className="text-white text-xl h-fit  ">{ state.name }</span>

            </div>
            <div className=" flex justify-around  mb-4">
                <button className="w-full cursor-pointer">
                    <IoSettingsSharp className="h-8 w-full hover:bg-base-100 text-base-300 hover:text-black transition-colors cursor-pointer" />
                </button>
                <button className="w-full cursor-pointer" onClick={ showDialog } >
                    <HiUserAdd className=" h-8 w-full hover:bg-base-100 text-base-300 hover:text-black  transition-colors cursor-pointer" />
                </button>
                { createPortal(
                    <NewUserDialog />,
                    document.getElementById("modal-root")!
                ) }
            </div>
        </>
    )
}