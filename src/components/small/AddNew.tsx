import { createPortal } from "react-dom";
import { HiUserAdd } from "react-icons/hi";

import NewUserDialog from "../layout/NewUserDialog";

function showDialog() {
    const ele = document.getElementById('newUserModal')! as HTMLDialogElement;
    ele.showModal()
}

export default function AddNew() {
    return (
        <>
            <div className="relative  w-fit h-fit left-[calc(100%-6em)]  bottom-12  z-20 ">
                <div onClick={ showDialog } className=" bg-neutral  rounded-full  p-3 text-2xl transition  text-secondary-content hover:cursor-pointer hover:bg-base-100 ">
                    <HiUserAdd />
                </div>
            </div>
            { createPortal(
                <NewUserDialog />,
                document.getElementById("modal-root")!
            ) }

        </>
    )
}