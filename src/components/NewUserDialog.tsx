import { useEffect, useState, useContext } from "react";
import { HiUserAdd } from "react-icons/hi";
import { ImCross } from "react-icons/im";

import { SocketContext } from "../context/SocketContext";

export default function NewUserDialog() {
    const [query, setQuery] = useState<string>('');

    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.emit('search', query)
    }, [query])

    return (
        <dialog id="newUserModal" className="modal">
            <div className="modal-box bg-white">
                <h1 className="text-lg">Type the email of the user you want to start the chat with</h1>
                <label className="input input-bordered flex items-center mt-3">
                    <HiUserAdd className=" mr-4 h-[80%] w-fit" />
                    <input type="text" className=" h-full w-full" value={ query } onChange={ e => setQuery(e.target.value) } />
                    { query !== '' &&
                        <button className="h-full" onClick={ () => setQuery('') }>
                            <ImCross className="text-error" />
                        </button>
                    }
                </label>

            </div>
        </dialog >
    )
}