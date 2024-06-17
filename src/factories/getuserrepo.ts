import { UserRepo } from "../repos/userRepo";
import { getStageCfg } from "../stageconfig";


let repo: UserRepo | null = null;
export function getUserRepo() {
    if (!repo) {
        repo = new UserRepo({ baseUrl: getStageCfg().serverUrl });
    }
    return repo;
}