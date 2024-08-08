import { ReactNode, useReducer, createContext } from "react";

// import AuthContext from "./AuthContext";
import { authReducer } from "./authReducer";

import type { AuthType } from "../misc/types";

const initialState = {
    email: '',
    imageUrl: '',
    name: '',
    userId: ''
}

const savedAuthState = sessionStorage.getItem('authState');
const initialAuthState = savedAuthState ? JSON.parse(savedAuthState) : initialState;


const AuthContext = createContext<AuthType>({
    state: initialAuthState,
    login: (): void => { },
    logout: (): void => { }
})


function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState);


    const login = async (token: string) => {
        const userAuthRequest = await fetch(`https://mern-chat-backend-emnj.onrender.com/auth`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())


        dispatchAuth({
            type: "UPSERT",
            payload: {
                type: "USERID",
                data: userAuthRequest.userId as string
            }
        });

        // now get the remaining user data
        const userInfoRequest = await fetch(`https://mern-chat-backend-emnj.onrender.com/user/${userAuthRequest.userId}`).then(res => res.json())

        dispatchAuth({
            type: "UPSERT",
            payload: {
                type: "USERDATA",
                data: userInfoRequest
            }
        })
    }

    const logout = () => {
        dispatchAuth({
            type: "CLEAR"
        })
    }

    const authContextValue = {
        state: auth,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={ authContextValue } >
            { children }
        </AuthContext.Provider>
    )
}
export { AuthContext }
export default AuthProvider