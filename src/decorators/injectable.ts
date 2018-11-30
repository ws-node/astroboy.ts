import { Constructor, IBaseInjectable, InjectScope, InjectToken } from "@bonbons/di";
import { GlobalDI, GlobalServiceMeta, GlobalSourceDI } from "../inject-server";

export function Injectable(config?: Partial<{
  type: InjectScope,
  token: InjectToken
}>) {
  return function <T>(target: Constructor<T>) {
    const { token = undefined, type = InjectScope.Scope } = config || {};
    const prototype: IBaseInjectable = target.prototype;
    prototype.__valid = true;
    const DYNAMIC_SERVICE = class {
      constructor() {
        const data = GlobalServiceMeta.get(token || DYNAMIC_SERVICE) || {};
        Object.keys(data).forEach(k => this[k] = data[k]);
      }
    };
    Object.defineProperty(DYNAMIC_SERVICE, "name", { value: target.name });
    Object.getOwnPropertyNames(prototype).forEach(name => {
      Object.defineProperty(
        DYNAMIC_SERVICE.prototype,
        name,
        Object.getOwnPropertyDescriptor(prototype, name)
      );
    });
    // @ts-ignore
    DYNAMIC_SERVICE.prototype.__proto__ = target.prototype.__proto__;
    GlobalSourceDI.register(token || DYNAMIC_SERVICE, target, InjectScope.Singleton);
    GlobalDI.register(token || DYNAMIC_SERVICE, DYNAMIC_SERVICE, type);
    return <typeof target>DYNAMIC_SERVICE;
  };
}