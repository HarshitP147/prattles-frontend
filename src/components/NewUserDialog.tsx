import { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { ImCross } from "react-icons/im";

export default function NewUserDialog() {
    const [query, setQuery] = useState<string>('');

    return (
        <dialog id="newUserModal" className="modal">
            <div className="modal-box bg-white">
                <h1 className="text-lg">Type the email of the user you want to start the chat with</h1>
                <label className="input input-bordered flex items-center mt-3">
                    <HiUserAdd className=" mr-4 h-[80%] w-fit" />
                    <input type="text" className=" h-full w-full" />
                    <button className="h-full">
                        { true && <ImCross className="text-error" /> }
                    </button>
                </label>

            </div>
        </dialog >
    )
}