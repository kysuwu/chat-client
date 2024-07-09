#!/usr/bin/env node

import { getCookieRepo } from "./factories/getcookierepo.js";
import { getMessageRepo } from "./factories/getmessagerepo.js";
import { getUserRepo } from "./factories/getuserrepo.js";
import { ChatService } from "./services/chat-service.js";
import { UI } from "./ui.js";
import { resolve } from "node:path";
import os from "os";
import Yargs from "yargs";
import { hideBin } from "yargs/helpers";

async function main() {
  const HOME = os.homedir();
  const COOKIE_FILE = HOME + "/anonchat.json";

  const argv = await Yargs(hideBin(process.argv)).option("profile", {
    alias: "p",
    type: "string",
    default: COOKIE_FILE,
  }).argv;

  const profile = resolve(argv.profile);

  let destroyUI: (() => void) | null = null;

  try {
    const ui = new UI((messageText) => {
      chatService.sendMessage(messageText);
    });
    destroyUI = () => {
      ui.destroy();
    };

    const cookieRepo = getCookieRepo(profile);
    const messageRepo = getMessageRepo();
    const userRepo = getUserRepo();
    const chatService = new ChatService(userRepo, messageRepo, cookieRepo);
    const actionStream = chatService.run();
    for await (const action of actionStream) {
      switch (action.type) {
        case "NEW_MESSAGE": {
          ui.addMessage(action.payload);
          break;
        }
        case "AUTH": {
          ui.setUser(action.payload);
          break;
        }
        case "AUTH_ERROR": {
          throw new Error(
            "FAILED TO AUTHENTICATE; REMOVE " + profile + " AND RESTART"
          );
        }
      }
    }
  } catch (e) {
    destroyUI?.();
    console.error("FAILED TO INITIALIZE", e);
    process.exit(1);
  }
}

main();
