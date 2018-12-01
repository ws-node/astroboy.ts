import { Constructor, IBaseInjectable } from "@bonbons/di";
import { Router } from "astroboy-router";
import { createInstance, GlobalImplements, getInjector, getShortScopeId, setColor } from "../utils";
import { InjectService } from "../services/Injector";
import { Configs } from "../services/Configs";
import { ENV } from "../configs";

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
        controller["$INTERNAL_INJECTOR"] = injector;
        return controller;
      }
    };
    Object.defineProperty(prototype, "$$injector", {
      get() { return this["$INTERNAL_INJECTOR"]; },
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
        descriptor.value = async function () {
          try {
            await value.bind(this)();
          } catch (e) {
            throw e;
          } finally {
            const injector: InjectService = this["$$injector"];
            if (!injector) {
              console.log(setColor("red", "[astroboy.ts] warning: $$injector is lost, memory weak."));
              return;
            }
            injector["INTERNAL_dispose"] && injector["INTERNAL_dispose"]();
            const { mode } = injector.get(Configs).get(ENV);
            if (mode !== "production" && mode !== "prod") {
              console.log(`${
                setColor("blue", "[astroboy.ts]")
                } : scope ${
                setColor("cyan", getShortScopeId(injector.scopeId))
                } is disposed [${
                setColor("red", new Date().getTime())
                }].`
              );
            }
          }
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