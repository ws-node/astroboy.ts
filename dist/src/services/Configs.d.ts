import { IConfigCollection, ConfigsCollection as ReadonlyConfigs } from "@bonbons/di";
export { InjectScope } from "@bonbons/di";
export interface ConfigToken<T> {
    key: symbol;
}
export interface ConfigEntry<T> {
    token: ConfigToken<T>;
    value: T;
}
export declare type TokenGenerator = <T>(key: string) => ConfigToken<T>;
export declare const createOptions: TokenGenerator;
export declare const createConfig: TokenGenerator;
export declare class RealConfigCollection implements IConfigCollection {
    private map;
    set<T>(token: ConfigToken<T>, entry: T): void;
    get<T>(token: ConfigToken<T>): T;
    toArray(): ConfigEntry<any>[];
}
export declare namespace Configs {
    interface Contract extends ReadonlyConfigs {
    }
}
/**
 * ## 全局配置容器
 * @description
 * @author Big Mogician
 * @export
 * @abstract
 * @class Configs
 * @implements {ReadonlyConfigs}
 */
export declare abstract class Configs implements Configs.Contract {
    /**
     * ### 解析并获得token对应的配置信息
     * @description
     * @author Big Mogician
     * @abstract
     * @template T
     * @param {ConfigToken<T>} token
     * @returns {T}
     * @memberof Configs
     */
    abstract get<T>(token: ConfigToken<T>): T;
}
