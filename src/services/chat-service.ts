import { Message } from "../entites/message";
import { CookieRepo } from "../repos/cookieRepo";
import { MessageRepo } from "../repos/messageRepo";
import { UserRepo } from "../repos/userRepo";

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
    const cookie = await this.cookieRepo.read()
    if(!cookie){
      throw new Error("No cookie found")
    }
    this.messageRepo.sendMessage(text, cookie);
  }
  async run(onNewMessage: (message: Message) => void) {
    const cookie = await this.cookieRepo.read();
    const user = await this.userRepo.getCurrentUser(cookie);
    await this.cookieRepo.write(user.cookie);
    let since = new Date(Date.now() - 1000 * 60 * 60);
    while (true) {
      const messages = await this.messageRepo.getRecentMessages(since);
      if (messages.length){
        since = messages[messages.length - 1].created_at;
      }
      for (const message of messages) {
        onNewMessage(message)
      }
      await this.sleep(5000);
    }
  }
}
