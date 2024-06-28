import { Message, MessageWithUser } from "../entites/message.js";
import { User } from "../entites/user.js";

export function addUsersToMessages(
  messages: Message[],
  users: User[]
): MessageWithUser[] {
  return messages.map((message) => {
    const user = users.find((user) => user._id === message.user_id);
    const messageWithUser: MessageWithUser = {
      ...message,
      user,
    };
    return messageWithUser;
  });
}
