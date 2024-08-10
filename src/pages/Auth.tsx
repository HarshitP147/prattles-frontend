import { useContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import { AuthContext } from "../context/AuthContext";


export default function Auth() {
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const loginGoogle = useGoogleLogin({
        flow: "implicit",
        onSuccess: (tokenRespose) => {
            login(tokenRespose.access_token);
        },
        onError: (error) => {
            console.error(error);
            setLoading(false);
        }
    })

    function authorize() {
        setLoading(true);
        loginGoogle();
    }

    return (
        <main
            className="text-white h-full grid place-items-center  ">
            <div className="mb-12 ">
                <img src="/speech-bubble.png" className="h-32 w-full object-contain" />
                <h1 className="text-3xl text-center my-12 ">Welcome to Prattles Chat App</h1>

                <button onClick={ () => authorize() } disabled={ loading } className="flex mx-auto  transition hover:scale-105 active:scale-100 ">
                    { !loading ?
                        <>
                            <span className=" bg-white p-2 rounded-l ">
                                <FcGoogle className="h-full text-2xl" />
                            </span>

                            <span className="rounded-r bg-base-100 px-4 py-2">
                                Click me to login
                            </span>
                        </>
                        :
                        <span className="loading loading-dots "></span>
                    }
                </button>

            </div>
        </main>
    )
}