import { createContext, ReactNode } from "react";
import { io } from "socket.io-client";

const socket = io(`https://mern-chat-backend-emnj.onrender.com`)

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