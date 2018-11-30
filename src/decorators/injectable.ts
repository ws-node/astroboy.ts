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
    const implement = class {
      constructor(ctx) {
        const data = GlobalServiceMeta.get(token || implement) || {};
        Object.keys(data).forEach(k => this[k] = data[k]);
      }
    };
    Object.defineProperty(implement, "name", { value: target.name });
    Object.getOwnPropertyNames(target.prototype).forEach(name => {
      Object.defineProperty(
        implement.prototype,
        name,
        Object.getOwnPropertyDescriptor(target.prototype, name)
      );
    });
    // @ts-ignore
    implement.prototype.__proto__ = target.prototype.__proto__;
    GlobalSourceDI.register(token || implement, target, InjectScope.Singleton);
    GlobalDI.register(token || implement, implement, type);
    return <typeof target>implement;
  };
}