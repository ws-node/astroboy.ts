import Koa from "koa";
import get from "lodash/get";
import uuid from "uuid/v4";
import { Constructor, getDependencies, DIContainer, ConfigsCollection, ScopeID } from "@bonbons/di";
import { InjectService } from "./services/Injector";

export const Colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  white: "\x1b[37m"
};

export function setColor(name: keyof typeof Colors, value: any): string {
  return `${Colors[name]}${value}${Colors.reset}`;
}

export const GlobalDI = new DIContainer();
export const GlobalImplements = new Map<any, any>();

export function setScopeId(ctx: Koa.Context) {
  const state = ctx.state || (ctx.state = {});
  return state["$$scopeId"] = uuid();
}

export function getScopeId(ctx: Koa.Context, short?: boolean): ScopeID {
  if (!short) return get(ctx, "state['$$scopeId']");
  return getShortScopeId(getScopeId(ctx, false));
}

export function getShortScopeId(scopeId: ScopeID): ScopeID {
  return (scopeId || "").toString().split("-")[0];
}

export function getInjector(ctx: Koa.Context) {
  return GlobalDI.get(InjectService, getScopeId(ctx));
}

export function resolveDepts<T>(target: Constructor<T>, ctx: Koa.Context) {
  return GlobalDI.getDepedencies(getDependencies(target) || [], getScopeId(ctx));
}

export function createInstance<T>(target: Constructor<T>, ctx: Koa.Context) {
  return new target(...resolveDepts(target, ctx));
}

export function optionAssign(configs: ConfigsCollection, token: any, newValue: any) {
  return isCustomClassInstance(newValue || {}) ?
    newValue :
    Object.assign(configs.get(token) || {}, newValue);
}

export function isCustomClassInstance(obj: any, type?: any) {
  return !type ?
    (getPrototypeConstructor(obj) !== Object) :
    (getPrototypeConstructor(obj) === type);
}

export function getPrototypeConstructor(obj) {
  const proto = Object.getPrototypeOf(obj);
  return proto && proto.constructor;
}