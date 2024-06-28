import { MessageRepo } from "../repos/messageRepo.js";
import { getStageCfg } from "../stageconfig.js";
let repo: MessageRepo | null = null;
export function getMessageRepo() {
  if (!repo) {
    repo = new MessageRepo({ baseUrl: getStageCfg().serverUrl });
  }
  return repo;
}
