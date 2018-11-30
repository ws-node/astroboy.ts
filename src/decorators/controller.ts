import { Constructor, IBaseInjectable, getDependencies } from "@bonbons/di";
import { Router } from "astroboy-router";
import { GlobalImplements, GlobalDI } from "../inject-server";

function resolveDepts<T>(target: Constructor<T>, ctx: any) {
  return GlobalDI.getDepedencies(getDependencies(target) || [], ctx.state["$$scopeId"]);
}

function createInstance<T>(target: Constructor<T>, ctx: any) {
  return new target(...(
    GlobalDI.getDepedencies(getDependencies(target) || [], ctx.state["$$scopeId"])
  ));
}

export function Controller(prefix: string) {
  return function <T>(target: Constructor<T>) {
    const prototype: IBaseInjectable = target.prototype;
    prototype.__valid = true;
    const DI_CONTROLLER = class {
      constructor(ctx) {
        return createInstance(target, ctx);
      }
    };
    Object.getOwnPropertyNames(prototype).forEach(name => {
      Object.defineProperty(
        DI_CONTROLLER.prototype,
        name,
        Object.getOwnPropertyDescriptor(prototype, name)
      );
    });
    // @ts-ignore
    DI_CONTROLLER.prototype.__proto__ = target.prototype.__proto__;
    Router(prefix)(target);
    GlobalImplements.set(DI_CONTROLLER, target);
    return <Constructor<T>>DI_CONTROLLER;
  };
}