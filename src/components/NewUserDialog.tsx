import { useEffect, useState, useContext } from "react";
import { HiUserAdd } from "react-icons/hi";
import { ImCross } from "react-icons/im";

import { SocketContext } from "../context/SocketContext";

type searchResult = {
    _id: string
    name: string,
    email: string,
    avatarUrl: string,
}

export default function NewUserDialog() {
    const [query, setQuery] = useState<string>('');
    const [searchResults, setResults] = useState<searchResult[]>([]);

    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.emit('search', query)
    }, [query])

    useEffect(() => {
        socket.on('userSearchResults', (contacts) => {
            setResults(contacts);
        })

        return () => {
            socket.off('userSearchResults');
        }
    }, [])

    function startNewChat(userId: string) {
        // socket.emit('newChat', {
        //     from: localStorage.getItem('userId'),
        //     to: userId
        // })
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
                                    <li key={ i } onClick={ () => startNewChat(people._id) } className="my-2 h-14 items-center px-4 py-2 transition hover:cursor-pointer flex mx-4 hover:bg-info rounded-xl" >
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
        </dialog >
    )
}