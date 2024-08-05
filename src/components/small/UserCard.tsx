import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

export default function UserCard() {
    const { state } = useContext(AuthContext);

    return (
        <div className="static flex justify-evenly items-center py-4">
            <div className="avatar ">
                <div className="w-14 rounded-full">
                    <img src={ state.imageUrl } />
                </div>
            </div>

            <span className="text-white text-xl h-fit ">{ state.name }</span>
        </div>
    )
}