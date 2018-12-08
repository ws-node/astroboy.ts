import { InjectDIToken, ScopeID } from "@bonbons/di";

/**
 * ## 依赖注入服务
 * * 手动注入器
 * @description
 * @author Big Mogician
 * @export
 * @abstract
 * @class InjectService
 */
export abstract class InjectService {
  abstract readonly scopeId: ScopeID;
  /**
   * ### 解析并获得类型实例
   * * 有可能为null
   * @description
   * @author Big Mogician
   * @abstract
   * @template T
   * @param {InjectDIToken<T>} token
   * @returns {T}
   * @memberof InjectService
   */
  abstract get<T>(token: InjectDIToken<T>): T;
  protected abstract INTERNAL_dispose(): void;
}

/**
 * ## 创建DI多重继承
 * * Proxy实现，只适合作为顶层服务存在
 * * 自定义多重先祖的优先级顺序
 * * 手动实现重载逻辑(如有必要)
 * * 不支持`deleteProperty`,`defineProperty`
 * * 不要使用`prop in object`来检查属性
 * * 不支持`toString`
 * * 不支持序列化
 * @description
 * @author Big Mogician
 * @export
 * @template T 对象DI类型
 * @param {T} target 当前对象
 * @param {string[]} depts 所有祖先实例在内部的字段名
 */
export function createInjectMixin<T extends object>(target: T, depts: string[]) {
  return new Proxy(target, {
    get(target, key) {
      if (target[key]) return target[key];
      for (let index = 0; index < depts.length; index++) {
        const current = target[depts[index]];
        if (current[key]) return current[key];
      }
      return undefined;
    },
    set(target, key, value) {
      if (target[key]) return target[key] = value;
      for (let index = 0; index < depts.length; index++) {
        const current = target[depts[index]];
        if (current[key]) return current[key] = value;
      }
    },
    deleteProperty(target, key) {
      throw new Error("Action [deleteProperty] of DI-Mixin is invalid.");
    },
    enumerate(target) {
      const ms = Object.assign({}, target, ...depts.map(i => target[i]));
      return Object.keys(ms);
    },
    ownKeys(target) {
      const ms = Object.assign({}, target, ...depts.map(i => target[i]));
      return Object.keys(ms);
    },
    has(target, key) {
      let has = key in target;
      if (has) return true;
      for (let index = 0; index < depts.length; index++) {
        has = depts[index] in target[depts[index]];
        if (has) return true;
      }
      return false;
    },
    defineProperty(target, key, descriptor) {
      throw new Error("Action [defineProperty] of DI-Mixin is invalid.");
    }
  });
}