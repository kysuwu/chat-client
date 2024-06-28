import { UserRepo } from "../repos/userRepo.js";
import { getStageCfg } from "../stageconfig.js";


let repo: UserRepo | null = null;
export function getUserRepo() {
    if (!repo) {
        repo = new UserRepo({ baseUrl: getStageCfg().serverUrl });
    }
    return repo;
}