import { Constructor, InjectScope, InjectToken } from "@bonbons/di";
interface IInjectableConfigs {
    type: InjectScope;
    token: InjectToken;
}
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
export declare function Injectable(): <T>(target: Constructor<T>) => Constructor<T>;
export declare function Injectable(scope: InjectScope): <T>(target: Constructor<T>) => Constructor<T>;
export declare function Injectable(config: Partial<IInjectableConfigs>): <T>(target: Constructor<T>) => Constructor<T>;
export {};
