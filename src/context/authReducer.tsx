import type { State, Action } from "../misc/types";


export function authReducer(state: State, action: Action): State {

    let newAuthState: State = state;
    switch (action.type) {
        case "UPSERT":
            // here we are sure that the user will send userId as new data
            switch (action.payload?.type) {
                case "USERID":
                    newAuthState.userId = action.payload?.data as string;
                    break;

                case "USERDATA":
                    newAuthState = {
                        ...action.payload?.data as State,
                        userId: state.userId,
                    };
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
