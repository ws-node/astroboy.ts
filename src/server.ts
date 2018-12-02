import Koa from "koa";
import { Constructor, InjectScope, ScopeID, InjectToken, AbstractType, ImplementFactory, ImplementType } from "@bonbons/di";
import { Context } from "./services/Context";
import { InjectService } from "./services/Injector";
import { ConfigCollection, ConfigEntry, ConfigToken, Configs } from "./services/Configs";
import { GlobalDI, optionAssign, getScopeId, setColor } from "./utils";
import { ENV, defaultEnv } from "./configs";
import { AstroboyContext } from "./services/AstroboyContext";
import { Scope } from "./services/Scope";

type DIPair = [any, any];

/**
 * ## astroboy.ts服务
 * @description
 * @author Big Mogician
 * @export
 * @class Server
 */
export class Server {

  private di = GlobalDI;
  private configs = new ConfigCollection();

  private preSingletons: DIPair[] = [];
  private preScopeds: DIPair[] = [];

  constructor(private appBuilder: Constructor<any>, private appConfigs?: any) { }

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
  public static Create(ctor: Constructor<any>, configs?: any) {
    return new Server(ctor, configs);
  }

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
  public option<T>(entry: ConfigEntry<Partial<T> | T>): this;
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
  public option<T>(token: ConfigToken<T>, value: Partial<T> | T): this;
  public option(...args: any[]): this {
    const [e1, e2] = args;
    if (!e1) {
      throw new Error("DI token or entry is empty, you shouldn't call BonbonsServer.use<T>(...) without any param.");
    }
    if (!e2 || args.length === 2) {
      this.configs.set(e1, optionAssign(this.configs, e1, e2));
    } else {
      const { token, value } = <ConfigEntry<any>>e1;
      this.configs.set(token, optionAssign(this.configs, token, value));
    }
    return this;
  }

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
  public scoped<TInject>(srv: Constructor<TInject>): this;
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
  public scoped<TToken, TImplement>(token: AbstractType<TToken>, srv: ImplementType<TImplement>): this;
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
  public scoped<TToken, TImplement>(token: AbstractType<TToken>, srv: ImplementFactory<TImplement>): this;
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
  public scoped<TToken, TImplement>(token: AbstractType<TToken>, srv: TImplement): this;
  public scoped(...args: any[]): this {
    this.preScopeds.push([args[0], args[1] || args[0]]);
    return this;
  }

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
  public singleton<TInject>(srv: Constructor<TInject>): this;
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
  public singleton<TToken, TImplement>(token: AbstractType<TToken>, srv: ImplementType<TImplement>): this;
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
  public singleton<TToken, TImplement>(token: AbstractType<TToken>, srv: ImplementFactory<TImplement>): this;
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
  public singleton<TToken, TImplement>(token: AbstractType<TToken>, srv: TImplement): this;
  public singleton(...args: any[]): this {
    this.preSingletons.push([args[0], args[1] || args[0]]);
    return this;
  }

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
  public run(events?: Partial<{
    onStart: (app) => void;
    onError: (error, ctx) => void;
  }>) {
    this.initOptions();
    this.initInjections();
    this.startApp(events);
  }

  private initOptions() {
    this.option(ENV, defaultEnv);
  }

  private initInjections() {
    this.initConfigCollection();
    this.initInjectService();
    this.initContextProvider();
    this.scoped(AstroboyContext);
    this.scoped(Scope);
  }

  private readConfigs(configs: any = {}) {
    this.configs.toArray().forEach(({ token }) => {
      const key = token.key.toString();
      if (/Symbol\(config::(.+)\)$/.test(key)) {
        this.option(token, configs[RegExp.$1] || {});
      }
    });
  }

  private startApp(events?: Partial<{
    onStart: (app) => void;
    onError: (error, ctx) => void;
  }>) {
    const {
      onStart = undefined,
      onError = undefined
    } = events || {};
    new this.appBuilder(this.appConfigs || {}).on("start", (app: Koa) => {
      this.readConfigs(app["config"]);
      this.resetDIResolver();
      this.resolveInjections();
      onStart && onStart(app);
    }).on("error", (error, ctx) => {
      onError && onError(error, ctx);
    });
  }

  /**
   * ## 按照配置设置DI的解析方式
   * * `native` : 原生模式
   * * `proxy` : Proxy代理模式
   * @description
   * @author Big Mogician
   * @private
   * @memberof Server
   */
  private resetDIResolver() {
    const { diType } = this.configs.get(ENV);
    this.di.resetConfigs({ type: diType });
  }

  /**
   * ## 完成DI容器初始化并锁定
   * @description
   * @author Big Mogician
   * @private
   * @memberof Server
   */
  private resolveInjections() {
    this.preSingletons.forEach(([token, srv]) => this.di.register(token, srv, InjectScope.Singleton));
    this.preScopeds.forEach(([token, srv]) => this.di.register(token, srv, InjectScope.Scope));
    this.di.complete();
  }

  /**
   * ## 初始化上下文服务
   * @description
   * @author Big Mogician
   * @private
   * @memberof Server
   */
  private initContextProvider() {
    this.scoped(
      Context,
      (scopeId?: ScopeID, { ctx = null } = {}) => {
        if (ctx === null) throw new Error("invalid call, you can only call a context in request pipe scope.");
        return new Context(ctx);
      }
    );
  }

  /**
   * ## 初始化手工注入服务
   * * 可以自举
   * @description
   * @author Big Mogician
   * @private
   * @memberof Server
   */
  private initInjectService() {
    this.scoped(
      InjectService,
      (scopeId?: ScopeID) => ({
        get: (token: InjectToken) => this.di.get(token, scopeId),
        INTERNAL_dispose: () => this.di.dispose(scopeId),
        scopeId
      })
    );
  }

  /**
   * ## 注入全局配置容器服务
   * @description
   * @author Big Mogician
   * @private
   * @memberof Server
   */
  private initConfigCollection() {
    this.singleton(
      Configs,
      () => ({ get: this.configs.get.bind(this.configs) }),
    );
  }

}
