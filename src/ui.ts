import { MessageWithUser } from "./entites/message.js";
import { isDiffDate } from "./helpers/isDiffDate.js";
import blessed from "blessed";
import chalk from "chalk";
import moment from "moment";

export class UI {
  private prevMessageDate: Date | null = null;
  constructor(onSendMessage: (text: string) => void) {
    this.screen.on("keypress", (ch, key) => {
      if (key.name === "return") {
        this.input.focus();
        this.screen.render();
      }
      if (key.ctrl && key.name === "c") {
        this.screen.destroy();
        process.exit();
      }
      if (key.name === "up") {
        this.messageList.scroll(-10);
        this.screen.render();
      }
      if (key.name === "down") {
        this.messageList.scroll(10);
        this.screen.render();
      }
    });

    this.input.on("submit", (text) => {
      if (text.trim() === "") {
        return;
      }
      onSendMessage(text);

      this.input.clearValue();
      this.screen.render();
    });

    this.input.on("focus", () => {
      this.input.removeLabel();
      this.screen.render();
    });

    this.input.on("blur", () => {
      if (this.input.value === "") {
        this.input.setLabel("enter...");
        this.screen.render();
      }
    });

    this.input.focus();
    this.screen.render();
  }
  addMessage(message: MessageWithUser) {
    if (
      this.prevMessageDate === null ||
      isDiffDate(this.prevMessageDate, message.created_at)
    ) {
      this.messageList.content +=
        chalk.rgb(255, 255, 255).bold(moment(message.created_at).format("ddd DD MMM")) + "\n\n";
    }
    const thewholefuckingmessagething =
      chalk.hex("#ffffff").bgBlack(message.user?.hrid) +
      " " +
      chalk.rgb(10, 200, 255)(moment(message.created_at).format("HH:mm:ss")) +
      "\n" +
      message.text +
      "\n\n";
    this.messageList.content += thewholefuckingmessagething;
    this.messageList.setScrollPerc(100);
    this.screen.render();
    this.prevMessageDate = message.created_at;
  }

  private screen = blessed.screen({ smartCSR: true });

  private messageList = blessed.box({
    parent: this.screen,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%-1",
    style: {
      bg: "#0000ff",
      fg: "#ffffff",
      border: { bg: "#0000ff", fg: "#ffffff" },
    },
    border: { type: "line" },
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      style: {
        bg: "#0000ff",
        track: "#ffffff",
      },
    },
    mouse: true,
  });

  private input = blessed.textbox({
    parent: this.screen,
    bottom: 0,
    left: 0,
    width: "100%",
    height: 1,
    keys: true,
    label: "enter...",
    inputOnFocus: true,
    style: {
      bg: "#000000",
      fg: "#ffffff",
    },
  });
}
