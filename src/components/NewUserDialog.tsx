import { useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { HiUserAdd } from "react-icons/hi";
import { ImCross } from "react-icons/im";

import { SocketContext } from "../context/SocketContext";

import FirstMessage from "./FirstMessage";

import type { PeopleSearchType } from "../misc/types";

export default function NewUserDialog() {
    const [query, setQuery] = useState<string>('');
    const [searchResults, setResults] = useState<PeopleSearchType[]>([]);
    const [newUser, setNewUser] = useState<PeopleSearchType>({ userId: '', avatarUrl: '', email: '', name: '' });

    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.emit('search', query)
    }, [query, socket])

    useEffect(() => {
        socket.on('userSearchResults', (contacts) => {
            setResults(contacts);
        })

        return () => {
            socket.off('userSearchResults');
            setQuery('');
        }
    }, [])

    function startNewChat(contact: PeopleSearchType) {
        // open a dialogue to enter the first message.
        const currentModal = document.getElementById('newUserModal')! as HTMLDialogElement;
        currentModal.close();
        setNewUser(contact);
        const ele = document.getElementById("first-message")! as HTMLDialogElement;
        ele.showModal();
    }

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
                { query &&
                    <ul className=" mt-5 w-full">
                        { searchResults.length === 0 ?
                            <div className=" ml-[auto] text-center  text-zinc-500">Couldn't find anyone with that email</div>
                            :
                            searchResults.map((people, i) => {
                                return (
                                    <li key={ i } onClick={ () => startNewChat(people) } className="my-2 h-14 items-center px-4 py-2 transition hover:cursor-pointer flex mx-4 hover:bg-info rounded-xl" >
                                        <img className="h-full rounded-full" src={ people.avatarUrl } alt={ `${people.email}'s profile image` } />
                                        <div className="flex flex-col ml-4">
                                            <span className="text-xl">
                                                { people.email }
                                            </span>
                                            <span>
                                                { people.name }
                                            </span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
            { createPortal(
                <FirstMessage { ...newUser } />,
                document.getElementById("modal-root")!
            ) }
        </dialog>
    )
}