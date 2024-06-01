import Dexie, { type EntityTable } from "dexie";

interface User {
    userId: String,
    avatar: File,
    name: String,
    email: String
}

const db = new Dexie('ChatDatabase') as Dexie & {
    user: EntityTable<User, 'userId'>;
}

db.version(1).stores({
    users: "userId, avatar, name, email"
})

export type { User }
export default db;