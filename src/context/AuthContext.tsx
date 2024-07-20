import { createContext } from "react";

import type { State, Action, AuthType } from "../misc/types";

const initialState = {
    email: '',
    imageUrl: '',
    name: '',
    userId: ''
}

const savedAuthState = localStorage.getItem('authState');
export const initialAuthState = savedAuthState ? JSON.parse(savedAuthState) : initialState;

const AuthContext = createContext<AuthType>({
    state: initialAuthState,
    login: (token: string): void => { },
    logout: (): void => { }
})

export function authReducer(state: State, action: Action): State {

    switch (action.type) {
        case "UPSERT":
            let newAuthState: State = state;
            // here we are sure that the user will send userId as new data

            switch (action.payload?.type) {
                case "USERID":
                    newAuthState.userId = action.payload?.data as string
                    break;

                case "USERDATA":
                    newAuthState = {
                        ...action.payload?.data as State,
                        userId: state.userId,
                    }
            }

            // set these values in the localStorage
            const authStateString = JSON.stringify(newAuthState)

            localStorage.setItem('authState', authStateString);


            return newAuthState;

        case "CLEAR":
            // this is only for logging out

            return {
                userId: '',
                email: '',
                name: '',
                imageUrl: ''
            };
    }
}

export default AuthContext