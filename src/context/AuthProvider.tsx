import { ReactNode, useReducer, } from "react";

import AuthContext, { authReducer, initialAuthState } from "./AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState);


    const login = async (token: string) => {
        const userAuthRequest = await fetch(`http://localhost:8080/auth`, {
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
        const userInfoRequest = await fetch(`http://localhost:8080/user/${userAuthRequest.userId}`).then(res => res.json())

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