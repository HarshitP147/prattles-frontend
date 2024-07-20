import { createContext } from "react";

import type { State, Action, AuthType } from "../misc/types";

export const initialAuthState: State = {
    email: '',
    imageUrl: '',
    name: '',
    userId: ''
}

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

// export function authReducer(state: State, action: Action): State {

//     switch (action.type) {
//         case "LOGIN":
//             // now the actual login

//             // async function getUserData() {

//             //     const userAuthRequest = await fetch(`http://localhost:8080/auth`, {
//             //         method: "POST",
//             //         headers: {
//             //             "Authorization": `Bearer ${action.token}`
//             //         }
//             //     }).then(res => res.json())


//             //     const userInfoRequest = await fetch(`http://localhost:8080/user/${userAuthRequest.userId}`).then(res => res.json())

//             //     let newAuthState: State = {
//             //         userId: userAuthRequest.userId as string,
//             //         name: userInfoRequest.name as string,
//             //         email: userInfoRequest.email as string,
//             //         imageUrl: userInfoRequest.imageUrl
//             //     };

//             //     return newAuthState
//             // }

//             // let newAuthState: State;

//             // getUserData().then(value => {
//             //     newAuthState = {
//             //         email: value.email,
//             //         imageUrl: value.imageUrl,
//             //         name: value.name,
//             //         userId: value.userId
//             //     }

//             //     return newAuthState;
//             // })



//         case "LOGOUT":
//             // now the actual logout
//             const logoutState: State = {
//                 email: '',
//                 imageUrl: '',
//                 name: '',
//                 userId: ''
//             }

//             return logoutState;
//     }
// }

export default AuthContext