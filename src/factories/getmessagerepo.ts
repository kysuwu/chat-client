import { MessageRepo } from "../repos/messageRepo";
import { getStageCfg } from "../stageconfig";
let repo: MessageRepo | null = null;
export function getMessageRepo() {
  if (!repo) {
    repo = new MessageRepo({ baseUrl: getStageCfg().serverUrl });
  }
  return repo;
}
