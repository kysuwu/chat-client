import { User } from "./user"

export interface Message {
    _id: string
    text: string
    created_at: Date 
    user_id: string
}

export interface MessageWithUser extends Message {
    user?: Omit<User,'cookie'>
}