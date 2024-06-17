import blessed from "blessed";

import { Message } from "./entites/message";

export class UI {
  constructor(onSendMessage: (text: string) => void) {
    this.screen.render();
    this.screen.on("keypress", (ch, key) => {
      if (key.name === "return") {
        this.input.focus();
        this.screen.render();
      }
      if (key.name === "C-c") {
        process.exit();
      }
      if (key.name === "up"){
        this.messageList.scroll(-1);
      }
      if (key.name === "down"){
        this.messageList.scroll(1);
      }

    });
    this.input.on("submit", (text) => {
      {
        onSendMessage(text);

        this.input.clearValue();
        this.screen.render();
      }
    });
  }
  addMessage(message: Message) {
    this.messageList.content += message.text + "\n";
    this.messageList.setScrollPerc(100)
    this.screen.render();
  }
  private screen = blessed.screen({ smartCSR: true });
  private messageList = blessed.box({
    parent: this.screen,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%-2",
    style: {
      bg: "yellow",
    },
    scrollable: true,
    // alwaysScroll: true,
    // scrollbar: {
    //   ch: " ",
    //   style: "simple",
    // }
  });
  private input = blessed.textbox({
    parent: this.screen,
    bottom: 0,
    left: 0,
    width: "100%",
    height: 1,
    keys: true,
    inputOnFocus: true,
    style: {
      bg: "green",
    },
  });
}
