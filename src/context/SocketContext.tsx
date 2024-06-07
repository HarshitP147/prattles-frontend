import React, { createContext } from "react";
import { Socket, io } from "socket.io-client";

const socket = io(`http://localhost:8080`, {
    withCredentials: true
})

interface SocketType {
    socket: Socket
}

export const SocketContext = createContext<SocketType>({
    socket: socket
})

export default function SocketProvider({ children }: { children: React.ReactNode }) {



    return (
        <SocketContext.Provider value={ {
            socket: socket
        } }>
            { children }
        </SocketContext.Provider>
    )
}