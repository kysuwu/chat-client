import { CookieRepo } from "../repos/cookieRepo";


let repo: CookieRepo | null = null;
export function getCookieRepo() {
    if (!repo) {
        repo = new CookieRepo();
    }
    return repo;
}