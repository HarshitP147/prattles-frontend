function logout() {
    sessionStorage.removeItem('authState');
    window.location.href = '/auth'
}


export default function Logout() {

    return (
        <dialog id="logoutModal" className="modal ">
            <div className="modal-box bg-white text-black">
                <h1 className="text-2xl">You are logging out.</h1>

                <h2 className="text-xl mt-2">Are you sure you want to continue?</h2>

                <div className="mt-3 flex justify-around">
                    <form method='dialog'>
                        <button className="btn bg-gray-300 hover:bg-gray-400  border-none text-black">Cancel</button>
                    </form>
                    <button onClick={ logout } className="btn bg-red-600  hover:bg-red-500   border-none text-white">Logout</button>
                </div>
            </div>
        </dialog>
    )
}