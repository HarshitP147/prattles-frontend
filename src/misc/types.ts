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
    selfUserId: string,
    chatId: string,
    participants: [{
        avatarUrl: string,
        email: string,
        name: string,
        userId: string,
        _id: string
    }],
    _id: string
}

export type InputBoxProps = {
    sending: boolean,
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

export type MessageLoaderType = {
    _id: string,
    messages: MessageType[]
}

export type MessageProps = {
    chatId: string,
    messages: MessageType[]
}