import { Constructor, AbstractType, ImplementFactory, ImplementType } from "@bonbons/di";
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
    private preSingletons;
    private preScopeds;
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
     * Set a scoped service
     * ---
     * * service should be decorated by @Injectable(...)
     *
     * Set a scoped service with constructor.
     * All scoped services will be created new instance in different request pipe
     *
     * @description
     * @author Big Mogician
     * @template TInject
     * @param {Constructor<TInject>} srv
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    scoped<TInject>(srv: Constructor<TInject>): this;
    /**
     * Set a scoped service
     * ---
     * * service should be decorated by @Injectable(...)
     *
     * Set a scoped service with injectable token (such abstract class,
     * but not the typescript interface because there's no interface in
     * the javascript runtime) and implement service constructor. All
     * scoped services will be created new instance in different request pipe.
     *
     * @description
     * @author Big Mogician
     * @template TToken
     * @template TImplement
     * @param {InjectableToken<TToken>} token
     * @param {ImplementToken<TImplement>} srv
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    scoped<TToken, TImplement>(token: AbstractType<TToken>, srv: ImplementType<TImplement>): this;
    /**
     * Set a scoped service
     * ---
     * * service should be decorated by @Injectable(...)
     *
     * Set a scoped service with injectable token (such abstract class,
     * but not the typescript interface because there's no interface in
     * the javascript runtime) and implement service instance factory
     * ( pure function with no side effects).
     * All scoped services will be created new instance in different request pipe.
     *
     * @description
     * @author Big Mogician
     * @template TToken
     * @template TImplement
     * @param {InjectableToken<TToken>} token
     * @param {InjectFactory<TImplement>} srv
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    scoped<TToken, TImplement>(token: AbstractType<TToken>, srv: ImplementFactory<TImplement>): this;
    /**
     * Set a scoped service
     * ---
     * * service should be decorated by @Injectable(...)
     *
     * Set a scoped service with injectable token (such abstract class,
     * but not the typescript interface because there's no interface in
     * the javascript runtime) and a well-created implement service instance.
     * All scoped services will be created new
     * instance in different request pipe (but injecting by instance means
     * the instance may be changed in runtime, so please be careful. If you
     * want to prevent this situation, use a service factory here).
     *
     * @description
     * @author Big Mogician
     * @template TInject
     * @template TImplement
     * @param {InjectableToken<TToken>} token
     * @param {TImplement} srv
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    scoped<TToken, TImplement>(token: AbstractType<TToken>, srv: TImplement): this;
    /**
     * Set a singleton service
     * ---
     * * service should be decorated by @Injectable(...)
     *
     * Set a singleton service with constructor.
     * All singleton services will use unique instance throught different request pipes.
     *
     * @description
     * @author Big Mogician
     * @template TInject
     * @param {Constructor<TInject>} srv
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    singleton<TInject>(srv: Constructor<TInject>): this;
    /**
     * Set a singleton service
     * ---
     * * service should be decorated by @Injectable(...)
     *
     * Set a singleton service with injectable token (such abstract class,
     * but not the typescript interface because there's no interface in
     * the javascript runtime) and implement service constructor.
     * All singleton services will use unique
     * instance throught different request pipes.
     *
     * @description
     * @author Big Mogician
     * @template TToken
     * @template TImplement
     * @param {InjectableToken<TToken>} token
     * @param {ImplementToken<TImplement>} srv
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    singleton<TToken, TImplement>(token: AbstractType<TToken>, srv: ImplementType<TImplement>): this;
    /**
     * Set a singleton service
     * ---
     * * service should be decorated by @Injectable(...)
     *
     * Set a singleton service with injectable token (such abstract class,
     * but not the typescript interface because there's no interface in
     * the javascript runtime) and implement service factory ( pure function with no side effects).
     * All singleton services will use unique
     * instance throught different request pipes.
     *
     * @description
     * @author Big Mogician
     * @template TToken
     * @template TImplement
     * @param {InjectableToken<B>} token
     * @param {InjectFactory<TImplement>} srv
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    singleton<TToken, TImplement>(token: AbstractType<TToken>, srv: ImplementFactory<TImplement>): this;
    /**
     * Set a singleton service
     * ---
     * * service should be decorated by @Injectable(...)
     *
     * Set a singleton service with injectable token (such abstract class,
     * but not the typescript interface because there's no interface in
     * the javascript runtime) and a well-created implement service instance.
     * All singleton services will use unique
     * instance throught different request pipes.
     *
     * @description
     * @author Big Mogician
     * @template TToken
     * @template TImplement
     * @param {InjectableToken<TToken>} token
     * @param {TImplement} srv
     * @returns {BonbonsServer}
     * @memberof BonbonsServer
     */
    singleton<TToken, TImplement>(token: AbstractType<TToken>, srv: TImplement): this;
    /**
     * ### 启动app
     * @description
     * @author Big Mogician
     * @param {Partial<{
     *     onStart: (app) => void;
     *     onError: (error, ctx) => void;
     *   }>} [events]
     * @memberof Server
     */
    run(events?: Partial<{
        onStart: (app: any) => void;
        onError: (error: any, ctx: any) => void;
    }>): void;
    private initOptions;
    private initInjections;
    private readConfigs;
    private startApp;
    /**
     * ## 按照配置设置DI的解析方式
     * * `native` : 原生模式
     * * `proxy` : Proxy代理模式
     * @description
     * @author Big Mogician
     * @private
     * @memberof Server
     */
    private resetDIResolver;
    /**
     * ## 完成DI容器初始化并锁定
     * @description
     * @author Big Mogician
     * @private
     * @memberof Server
     */
    private resolveInjections;
    /**
     * ## 初始化上下文服务
     * @description
     * @author Big Mogician
     * @private
     * @memberof Server
     */
    private initContextProvider;
    /**
     * ## 初始化手工注入服务
     * * 可以自举
     * @description
     * @author Big Mogician
     * @private
     * @memberof Server
     */
    private initInjectService;
    /**
     * ## 注入全局配置容器服务
     * @description
     * @author Big Mogician
     * @private
     * @memberof Server
     */
    private initConfigCollection;
}
