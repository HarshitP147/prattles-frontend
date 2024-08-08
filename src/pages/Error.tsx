import { useRouteError, useNavigate } from "react-router-dom"

import type { RouteErrorType } from "../misc/types";

export default function Error() {
    const error = useRouteError() as RouteErrorType
    const nav = useNavigate();

    console.error(error);

    return (
        <main className="bg-primary-content h-[100vh] w-full grid place-content-center ">

            <h1 className="text-4xl text-center ">Oops!!</h1>

            <h2 className="text-2xl text-center py-8">An unexpected error has occurred.</h2>
            <h3 className="text-center text-lg my-2 text-zinc-400">{ error.status } : { error.statusText }</h3>

            <button className=" btn mx-auto my-8" onClick={ () => nav(-1) }>Go back</button>

        </main>
    )
}