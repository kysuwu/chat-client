import axios from "axios";

import { Message, MessageWithUser } from "../entites/message";
import { addUsersToMessages } from "../helpers/addUsersToMessage";

export class MessageRepo {
    constructor(private options: { baseUrl: string }) {}
    async getRecentMessages(since: Date): Promise<MessageWithUser[]> {
        const baseURL = this.options.baseUrl;
        const response = await axios.get("/api/messages", {baseURL, params: {since}});
        return addUsersToMessages(response.data.messages, response.data.users);
    }
    async sendMessage(text: string, cookie: string): Promise<Message> {
        const baseURL = this.options.baseUrl;
        const response = await axios.post("/api/messages", {text, cookie}, {baseURL});
        return response.data;
    }
}
