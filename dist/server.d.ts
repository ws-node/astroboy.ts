import { Constructor } from "@bonbons/di";
import { ConfigEntry, ConfigToken } from "./services/Configs";
/**
 * ## astroboy.ts服务
 * @description
 * @author Big Mogician
 * @export
 * @class Server
 */
export declare class Server {
    private appBuilder;
    private appConfigs?;
    private di;
    private configs;
    constructor(appBuilder: Constructor<any>, appConfigs?: any);
    /**
     * ### 创建一个新的应用
     * @description
     * @author Big Mogician
     * @static
     * @param {Constructor<any>} ctor astroboy或者其继承
     * @param {*} [configs] astroboy启动配置
     * @returns
     * @memberof Server
     */
    static Create(ctor: Constructor<any>, configs?: any): Server;
    /**
     * ### 注入一个配置项
     * Set an option with format entry{@ConfigEntry<T>}.
     *
     * @description
     * @author Big Mogician
     * @template T
     * @param {ConfigEntry<Partial<T>|T>} entry ConfigEntry<T>
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    option<T>(entry: ConfigEntry<Partial<T> | T>): this;
    /**
     * ### 注入一个配置项
     * Set an option with token and provided value.
     *
     * @description
     * @author Big Mogician
     * @template T
     * @param {ConfigToken<T>} token
     * @param {Partial<T>} value
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    option<T>(token: ConfigToken<T>, value: Partial<T> | T): this;
    /**
     * ### 启动app
     * @description
     * @author Big Mogician
     * @param {() => void} [onStart] on('start') 回调
     * @memberof Server
     */
    run(onStart?: () => void): void;
    private initOptions;
    private initInjections;
    private startApp;
    private initContextProvider;
    private initInjectService;
    private initConfigCollection;
}
