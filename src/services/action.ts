import { MessageWithUser } from "../entites/message.js";
import { User } from "../entites/user.js";

export type NewMessageAction = {
  type: "NEW_MESSAGE";
  payload: MessageWithUser;
};

export type AuthAction = {
  type: "AUTH";
  payload: User;
};

export type AuthErrorAction = {
  type: "AUTH_ERROR";
};

export type Action = NewMessageAction | AuthAction | AuthErrorAction;
