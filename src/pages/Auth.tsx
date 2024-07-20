import { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import AuthContext from "../context/AuthContext";


export default function Auth() {

    const { login } = useContext(AuthContext);

    const loginGoogle = useGoogleLogin({
        flow: "implicit",
        onSuccess: (tokenRespose) => {
            login(tokenRespose.access_token);
        },
        onError: (error) => {
            console.error(error);
        }
    })


    return (
        <section className="text-white">
            <button className="btn btn-info text-white " onClick={ () => loginGoogle() }>Get google access token</button>
        </section>
    )
}