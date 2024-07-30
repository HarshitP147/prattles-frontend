import { createContext, ReactNode } from "react";
import { io } from "socket.io-client";

const socket = io(`http://localhost:8080`, {

})

export const SocketContext = createContext({
    socket: socket
})

export default function SocketProvider({ children }: { children: ReactNode }) {

    return (
        <SocketContext.Provider value={ {
            socket: socket
        } }>
            { children }
        </SocketContext.Provider>
    )
}