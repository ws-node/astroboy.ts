import Koa from "koa";
import { GlobalDI, getShortScopeId, setScopeId, setColor } from "../utils";

export const serverInit = async (ctx: Koa.Context, next: () => Promise<void>) => {
  const scopeId = setScopeId(ctx);
  GlobalDI.createScope(scopeId, { ctx });
  console.log(`${setColor("blue", "[astroboy.ts]")} : scope ${
    setColor("cyan", getShortScopeId(scopeId))
    } is init [${setColor("green", new Date().getTime())}].`);
  await next();
};