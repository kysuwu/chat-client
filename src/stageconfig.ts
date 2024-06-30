import { ok } from "assert";

export const stagecfg = {
  DEV: { serverUrl: "http://localhost:3000" },
  PROD: { serverUrl: "https://kysanonchat.vercel.app" },
  PREV: {
    serverUrl: "https://chat-server-kysuwu-afafs-projects-3d10693f.vercel.app",
  },
};

export function getStageCfg(): { serverUrl: string } {
  const s = process.env.STAGE || "PROD";
  ok(
    s === "DEV" || s === "PROD" || s === "PREV",
    "invalid stage, got " + s + ", expected "+Object.keys(stagecfg).join("|")
  );
  return stagecfg[s];
}
