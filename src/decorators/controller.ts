import { BaseClass } from "astroboy";
import { Constructor, IBaseInjectable, getDependencies } from "@bonbons/di";
import { Router } from "astroboy-router";
import { GlobalImplements, GlobalDI } from "../inject-server";

export function Controller(prefix: string) {
  return function <T>(target: Constructor<T>) {
    const prototype: IBaseInjectable = target.prototype;
    prototype.__valid = true;
    const implement = class extends (<any>target) {
      constructor(_) {
        super(...((getDependencies(target) || []).map(i => GlobalDI.get(i))));
        this.ctx = _;
      }
    };
    Router(prefix)(target);
    GlobalImplements.set(implement, target);
    return <Constructor<T>>implement;
  };
}