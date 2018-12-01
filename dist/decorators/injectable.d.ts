import { Constructor, InjectScope, InjectToken } from "@bonbons/di";
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
export declare function Injectable(config?: Partial<{
    type: InjectScope;
    token: InjectToken;
}>): <T>(target: Constructor<T>) => Constructor<T>;
