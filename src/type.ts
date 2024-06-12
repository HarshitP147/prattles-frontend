export type PeopleSearchType = {
    userId: string
    name: string,
    email: string,
    avatarUrl: string,
}

export type ChatType = {
    _id: string,
    chatId: string,
    chatType: "single" | "group",
    lastMessage: string
}
