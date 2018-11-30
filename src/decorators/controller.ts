import { Constructor, IBaseInjectable, getDependencies } from "@bonbons/di";
import { Router } from "astroboy-router";
import { GlobalImplements, GlobalDI } from "../inject-server";

export function Controller(prefix: string) {
  return function <T>(target: Constructor<T>) {
    const prototype: IBaseInjectable = target.prototype;
    prototype.__valid = true;
    const implement = class {
      constructor(_) {
        const depts = GlobalDI.getDepedencies(getDependencies(target) || [], _.state["$$scopeId"]);
        return new target(...depts);
      }
    };
    Object.getOwnPropertyNames(prototype).forEach(name => {
      Object.defineProperty(
        implement.prototype,
        name,
        Object.getOwnPropertyDescriptor(prototype, name)
      );
    });
    Router(prefix)(target);
    GlobalImplements.set(implement, target);
    return <Constructor<T>>implement;
  };
}