import uuid from "uuid/v4";
import Koa from "koa";
import { GlobalDI } from "../inject-server";

export const serverInit = async (ctx: Koa.Context, next: () => Promise<void>) => {
  const state = ctx.state || (ctx.state = {});
  const scopeId = state["$$scopeId"] = uuid();
  GlobalDI.createScope(scopeId, { ctx });
  await next();
};