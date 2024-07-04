import { Message } from "../entites/message.js";
import { CookieRepo } from "../repos/cookieRepo.js";
import { MessageRepo } from "../repos/messageRepo.js";
import { UserRepo } from "../repos/userRepo.js";
import { Action } from "./action.js";

const pollInterval = 500;
const initTimeOffset = 1000 * 60 * 60;
export class ChatService {
  constructor(
    private userRepo: UserRepo,
    private messageRepo: MessageRepo,
    private cookieRepo: CookieRepo
  ) {}
  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async sendMessage(text: string): Promise<void> {
    const cookie = await this.cookieRepo.read();
    if (!cookie) {
      throw new Error("No cookie found");
    }
    this.messageRepo.sendMessage(text, cookie);
  }
  async *run(): AsyncGenerator<Action> {
    const cookie = await this.cookieRepo.read();
    try {
      const user = await this.userRepo.getCurrentUser(cookie);
      yield {
        type: "AUTH",
        payload: user,
      };
      await this.cookieRepo.write(user.cookie);
    } catch (e) {
      debugger
      yield {
        type: "AUTH_ERROR",
      };
      return;
    }
    let since = new Date(Date.now() - initTimeOffset);
    while (true) {
      const messages = await this.messageRepo.getRecentMessages(since);
      if (messages.length) {
        since = messages[messages.length - 1].created_at;
      }
      for (const message of messages) {
        yield {
          type: "NEW_MESSAGE",
          payload: message,
        };
      }
      await this.sleep(pollInterval);
    }
  }
}
