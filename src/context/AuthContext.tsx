import { createContext } from "react";

import type { State, Action, AuthType } from "../misc/types";

const initialState = {
    email: '',
    imageUrl: '',
    name: '',
    userId: ''
}

const savedAuthState = sessionStorage.getItem('authState');
export const initialAuthState = savedAuthState ? JSON.parse(savedAuthState) : initialState;

const AuthContext = createContext<AuthType>({
    state: initialAuthState,
    login: (token: string): void => { },
    logout: (): void => { }
})

export function authReducer(state: State, action: Action): State {

    let newAuthState: State = state;
    switch (action.type) {
        case "UPSERT":
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
                    break;
            }

            // set these values in the sessionStorage

            sessionStorage.setItem('authState', JSON.stringify(newAuthState));


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