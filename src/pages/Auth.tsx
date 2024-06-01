import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function Auth() {
    const nav = useNavigate();

    function getUserData(token: string) {
        fetch(`http://localhost:8080/auth/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("userId", data.userId)
                localStorage.setItem("token", data.token)
                localStorage.setItem("tokenExpiry", data.tokenExpiry)
                nav("/chat");
            })
            .catch(err => { alert(err) })
    }


    const loginGoogle = useGoogleLogin({
        flow: "implicit",
        onSuccess: (tokenRespose) => {
            getUserData(tokenRespose.access_token);
        },
        onError: (error) => {
            console.error(error);
        }
    })


    return (
        <section className="text-white">
            <button className="btn btn-info text-white" onClick={ () => loginGoogle() }>Get google access token</button>
        </section>
    )
}