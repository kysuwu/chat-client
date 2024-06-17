import { getCookieRepo } from "./factories/getcookierepo";
import { getMessageRepo } from "./factories/getmessagerepo";
import { getUserRepo } from "./factories/getuserrepo";
import { ChatService } from "./services/chat-service";
import { UI } from "./ui";

const ui = new UI((messageText) => {chatService.sendMessage(messageText)});
const cookieRepo = getCookieRepo();
const messageRepo = getMessageRepo();
const userRepo = getUserRepo();
const chatService = new ChatService(userRepo, messageRepo, cookieRepo);
await chatService.run((message) => ui.addMessage(message));

