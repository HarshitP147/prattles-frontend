export type PeopleSearchType = {
    userId: string
    name: string,
    email: string,
    avatarUrl: string,
}

export type ChatType = {
    _id: string,
    chatId: string,
    participants: [{
        _id: string,
        userId: string,
        name: string,
        avatarUrl: string
    }],
    lastMessage: {
        _id: string,
        createdAt: string,
        sender: {
            _id: string,
            userId: string,
            name: string,
            avatarUrl: string
        },
        content: [{
            text?: string,
            images?: [string]
        }]
    }
}
