import { Constructor, IBaseInjectable } from "@bonbons/di";
import { Router } from "astroboy-router";
import { createInstance, GlobalImplements, getInjector, getShortScopeId, setColor } from "../utils";
import { InjectService } from "../services/Injector";
import { Context } from "../services/Context";
import { Configs } from "../services/Configs";
import { ENV } from "../configs";
import { Scope } from "../services/Scope";

const INTERNAL_INJECTOR = "$INTERNAL_INJECTOR";
const $$injector = "$$injector";

/**
 * ## 定义控制器
 * * routes部分由astroboy-router实现
 * @description
 * @author Big Mogician
 * @export
 * @param {string} prefix
 * @returns
 */
export function Controller(prefix: string) {
  return function <T>(target: Constructor<T>) {
    const prototype: IBaseInjectable = target.prototype;
    prototype.__valid = true;
    Router(prefix)(target);
    const DI_CONTROLLER = class {
      constructor(ctx) {
        const injector = getInjector(ctx);
        const controller = createInstance(target, ctx);
        controller[INTERNAL_INJECTOR] = injector;
        return controller;
      }
    };
    Object.defineProperty(prototype, $$injector, {
      get() { return this[INTERNAL_INJECTOR]; },
      configurable: false,
      enumerable: false
    });
    const { routes = {} } = prototype["@router"];
    Object.getOwnPropertyNames(prototype).forEach(name => {
      if (name === "@router") return;
      if (name === "constructor") return;
      const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
      const { value, get } = descriptor;
      if (get) return;
      if (name in routes && value && typeof value === "function") {
        const method = routes[name].method[0] || "GET";
        descriptor.value = async function () {
          const injector: InjectService = this[$$injector];
          const { ctx } = injector.get<Context<{}>>(Context);
          const params = method === "GET" ?
            [ctx.query] :
            [ctx.body, ctx.query];
          await value.bind(this)(...params);
        };
        Object.defineProperty(prototype, name, descriptor);
      }
    });
    Object.getOwnPropertyNames(prototype).forEach(name => {
      Object.defineProperty(
        DI_CONTROLLER.prototype,
        name,
        Object.getOwnPropertyDescriptor(prototype, name)
      );
    });
    // @ts-ignore
    DI_CONTROLLER.prototype.__proto__ = target.prototype.__proto__;
    // @ts-ignore
    DI_CONTROLLER.__proto__ = target.__proto__;
    GlobalImplements.set(DI_CONTROLLER, target);
    return <Constructor<T>>DI_CONTROLLER;
  };
}