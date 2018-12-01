import { Constructor, IBaseInjectable, InjectScope, InjectToken, getDependencies } from "@bonbons/di";
import { GlobalDI } from "../utils";

/**
 * ## 定义服务
 * @description
 * @author Big Mogician
 * @export
 * @param {Partial<{
 *   type: InjectScope,
 *   token: InjectToken
 * }>} [config]
 * @returns
 */
export function Injectable(config?: Partial<{
  type: InjectScope,
  token: InjectToken
}>) {
  return function <T>(target: Constructor<T>) {
    const { token = undefined, type = InjectScope.Scope } = config || {};
    const prototype: IBaseInjectable = target.prototype;
    prototype.__valid = true;
    GlobalDI.register(token || target, target, type);
    return <Constructor<T>>(token || target);
  };
}