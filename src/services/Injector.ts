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