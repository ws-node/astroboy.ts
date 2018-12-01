import { IToken, ITokenGenerator, IEntry, IConfigCollection, ConfigsCollection as ReadonlyConfigs } from "@bonbons/di";
export declare type ConfigToken<T> = IToken<T>;
export declare type ConfigEntry<T> = IEntry<T>;
export declare const createToken: ITokenGenerator;
export declare class ConfigCollection implements IConfigCollection {
    private map;
    set<T>(token: ConfigToken<T>, entry: T): void;
    get<T>(token: ConfigToken<T>): T;
    toArray(): ConfigEntry<any>[];
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
export declare abstract class Configs implements ReadonlyConfigs {
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
