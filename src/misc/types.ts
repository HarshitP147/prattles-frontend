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

export type ChatsType = {
    _id: string,
    messages: [{
        _id: string,
        sender: {
            _id: string,
            userId: string
        },
        content: {
            text: string,
            images?: []
        }
    }]
}