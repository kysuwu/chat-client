import { Message } from "../entites/message";
import axios from "axios";

export class MessageRepo {
    constructor(private options: { baseUrl: string }) {}
    async getRecentMessages(since: Date): Promise<Message[]> {
        const baseURL = this.options.baseUrl;
        const response = await axios.get("/api/messages", {baseURL, params: {since}});
        return response.data;
    }
    async sendMessage(text: string, cookie: string): Promise<Message> {
        const baseURL = this.options.baseUrl;
        const response = await axios.post("/api/messages", {text, cookie}, {baseURL});
        return response.data;
    }
}
