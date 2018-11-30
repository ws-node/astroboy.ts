import uuid from "uuid/v4";
import { GlobalDI } from "../inject-server";

export const serverInit = async (ctx, next) => {
  const state = ctx.state || (ctx.state = {});
  const scopeId = state["$$scopeId"] = uuid();
  GlobalDI.createScope(scopeId, { ctx });
  console.log("start request");
  await next();
};