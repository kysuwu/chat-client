import { CookieRepo } from "../repos/cookieRepo.js";

let repo: CookieRepo | null = null;
export function getCookieRepo(profile: string) {
    if (!repo) {
        repo = new CookieRepo(profile);
    }
    return repo;
}