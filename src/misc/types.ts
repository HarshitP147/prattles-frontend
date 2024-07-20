import { Dispatch, SetStateAction } from "react"

export type State = {
    email: string,
    name: string,
    userId: string,
    imageUrl: string
}

export type Action = {
    type: "UPSERT" | "CLEAR",
    payload?: {
        type: "USERID" | "USERDATA",
        data: string | State
    }
}

export type AuthType = {
    state: State,
    login: (token: string) => void,
    logout: () => void
}

export type PeopleSearchType = {
    userId: string
    name: string,
    email: string,
    avatarUrl: string,
}

export type ChatContactType = {
    _id: string,
    chatId: string,
    lastMessage: {
        _id: string,
        createdAt: string,
        sender: {
            _id: string,
            userId: string,
            name: string,
            avatarUrl: string
        },
        content: {
            text?: string,
            images?: [string]
        }
    },
    participants: [{
        _id: string,
        userId: string,
        name: string,
        avatarUrl: string
    }]
}

export type InputBoxProps = {
    message: string,
    setMessage: Dispatch<SetStateAction<string>>,
    sendMessage: () => void
}

export type MessageType = {
    content: {
        text: string,
        images: []
    },
    createdAt: string,
    sender: {
        _id: string,
        userId: string
    },
    _id: string
}

export type ChatLoaderType = {
    _id: string,
    messages: MessageType[]
}

export type MessageProps = {
    chatId: string,
    messages: MessageType[]
}