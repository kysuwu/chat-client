#!/usr/bin/env node

import { getCookieRepo } from "./factories/getcookierepo.js";
import { getMessageRepo } from "./factories/getmessagerepo.js";
import { getUserRepo } from "./factories/getuserrepo.js";
import { ChatService } from "./services/chat-service.js";
import { UI } from "./ui.js";

try {
  const ui = new UI((messageText) => {
    chatService.sendMessage(messageText);
  });
  const cookieRepo = getCookieRepo();
  const messageRepo = getMessageRepo();
  const userRepo = getUserRepo();
  const chatService = new ChatService(userRepo, messageRepo, cookieRepo);
  await chatService.run((message) => ui.addMessage(message));
} catch (e) {
  console.error("FAILED TO INITIALIZE", e);
  process.exit(1);
}
