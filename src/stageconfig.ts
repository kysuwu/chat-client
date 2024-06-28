import { ok } from "assert";

export const stagecfg = {
  dev: { serverUrl: "http://localhost:3000" },
  prod: { serverUrl: "https://kysanonchat.vercel.app" },
  prev: { serverUrl: "https://chat-server-kysuwu-afafs-projects-3d10693f.vercel.app" },
};

export function getStageCfg(): { serverUrl: string } {
  const s = process.env.STAGE || "prod";
  ok(s === "dev" || s === "prod" || s === "prev");
  return stagecfg[s];
}
