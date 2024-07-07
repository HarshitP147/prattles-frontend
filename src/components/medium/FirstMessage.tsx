import { useState, useEffect, useContext } from "react";

import { SocketContext } from "../../context/SocketContext";

import type { PeopleSearchType } from "../../misc/types";

export default function FirstMessage(props: PeopleSearchType) {
    const [message, setMessage] = useState<string>('');

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        return () => {
            setMessage('');
        }
    }, [])

    function startChatting() {
        // socket.emit('newChat', {
        //     from: sessionStorage.getItem("userId"),
        //     to: props.userId,
        //     message: message
        // })
    }

    return (
        <dialog id="first-message" className="modal">
            <div className="modal-box">
                <div className="flex items-center ">
                    <img className="rounded-full h-20 w-20" src={ props.avatarUrl } alt={ `${props.name}'s avatar` } />
                    <h3 className="font-bold text-lg ml-5">{ props.email }</h3>
                </div>
                <p className="py-4">Type your first message to { props.name }</p>
                <input type="text" value={ message } onChange={ e => setMessage(e.target.value) } className=" h-10 w-full input input-primary" />
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-secondary text-white" onClick={ startChatting }>Send and start chatting</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}