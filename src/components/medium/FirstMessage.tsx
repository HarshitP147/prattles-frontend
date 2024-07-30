import { useState, useContext } from "react";

import AuthContext from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";

import type { ChatContactType, PeopleSearchType } from "../../misc/types";

export default function FirstMessage(props: PeopleSearchType) {
    const [message, setMessage] = useState<string>('');

    const { socket } = useContext(SocketContext);

    const { state } = useContext(AuthContext)

    function startChatting() {
        socket.emit('newChat', {
            from: state.userId,
            to: props.userId,
            message: message
        }, (response: ChatContactType[]) => {
            // we immediately get the list with new chat
            console.log(response);
        })
        setMessage('');
    }

    return (
        <dialog id="first-message" className="modal">
            <div className="modal-box bg-secondary-content text-black">
                <div className="flex items-center ">
                    <img className="rounded-full h-20 w-20" src={ props.avatarUrl } alt={ `${props.name}'s avatar` } />
                    <h3 className="font-bold text-lg ml-5">{ props.email }</h3>
                </div>
                <p className="py-4">Type your first message to { props.name }</p>
                <input type="text" value={ message } onChange={ e => setMessage(e.target.value) } className=" h-10 w-full bg-white input input-primary" />
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-info  text-white" onClick={ startChatting }>Send and start chatting</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}