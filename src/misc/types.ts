import { Dispatch, SetStateAction } from "react"

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

export type ChatMessagesType = {
    messages: [{
        content: {
            text: string,
            images: []
        },
        createdAt: string,
        sender: {
            _id: string,
            userId: string
        },
        _id: string,
    }]
}

export type InputBoxProps = {
    message: string,
    setMessage: Dispatch<SetStateAction<string>>,
    sendMessage: () => void
}

export type MessagesProp = {
    chatId: string,
    messages: ChatMessagesType
}