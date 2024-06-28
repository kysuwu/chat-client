import { CookieRepo } from "../repos/cookieRepo.js";


let repo: CookieRepo | null = null;
export function getCookieRepo() {
    if (!repo) {
        repo = new CookieRepo();
    }
    return repo;
}