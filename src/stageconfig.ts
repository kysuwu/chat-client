export const stagecfg = {
  local: { serverUrl: "http://localhost:3000" },
  prod: { serverUrl: "" },
  dev: { serverUrl: "" },
};

export function getStageCfg(): { serverUrl: string } {
  return stagecfg[process.env.STAGE || "prod"];
}
