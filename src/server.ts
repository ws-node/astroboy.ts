import Koa from "koa";
import Astroboy from "astroboy";
import { Context } from "./services/Context";
import { InjectService } from "./services/Injector";
import { AstroboyContext } from "./services/AstroboyContext";
import { Scope } from "./services/Scope";
import { GlobalDI, optionAssign, PartReset, ChangeReturn } from "./utils";
import {
  Constructor,
  InjectScope,
  ScopeID,
  InjectToken,
  AbstractType,
  ImplementType,
  DIContainer
} from "@bonbons/di";
import { ENV, defaultEnv, CONFIG_VIEW, defaultView } from "./configs";
import {
  defaultJsonResultOptions,
  JSON_RESULT_OPTIONS,
  InnerRouterOptions,
  ROUTER_OPTIONS,
  defaultRouterOptions,
  RENDER_RESULT_OPTIONS,
  defaultRenderResultOptions,
  STATIC_RESOLVER,
  defaultGlobalError,
  GLOBAL_ERROR
} from "./options";
import { RealConfigCollection, ConfigToken, Configs } from "./services/Configs";
import { TypedSerializer } from "./plugins/typed-serializer";
import {
  NunjunksEngine,
  NUNJUNKS_OPTIONS,
  defaultNunjunksOptions
} from "./plugins/nunjunks";
import {
  SimpleLogger,
  SIMPLE_LOGGER_OPTIONS,
  defaultSimpleLoggerOptions
} from "./plugins/simple-logger";
import { Render } from "./services/Render";
import { initRouters } from "./builders";

type DIPair = [any, any];

export interface FactoryContext {
  injector: InjectService;
  configs: Configs;
}

/**
 * ## astroboy.ts服务
 * @description
 * @module Server
 * @author Big Mogician
 * @export
 * @class Server
 */
export class Server {
  private di = GlobalDI;
  private configs = new RealConfigCollection();

  private preSingletons: DIPair[] = [];
  private preScopeds: DIPair[] = [];
  private preUniques: DIPair[] = [];

  private appBuilder!: Constructor<any>;
  private appConfigs!: any;

  constructor();
  constructor(appBuilder: Constructor<any>);
  constructor(appConfigs: any);
  constructor(appBuilder: Constructor<any>, appConfigs: any);
  constructor(...args: any[]) {
    const [ctor, configs] = args;
    if (!ctor) {
      this.appBuilder = Astroboy;
    } else if (ctor.prototype === undefined) {
      this.appBuilder = Astroboy;
      this.appConfigs = ctor;
    } else {
      this.appBuilder = ctor;
      this.appConfigs = configs;
    }
    this.preInit();
  }

  /**
   * ### 创建一个新的应用
   * @description
   * @author Big Mogician
   * @static
   * @param {Constructor<any>?} ctor astroboy或者其继承
   * @param {*?} [configs] astroboy启动配置
   * @returns
   * @memberof Server
   */
  public static Create(): Server;
  public static Create(ctor: Constructor<any>): Server;
  public static Create(configs: any): Server;
  public static Create(ctor: Constructor<any>, configs: any): Server;
  public static Create(ctor?: Constructor<any>, configs?: any) {
    return new Server(ctor, configs);
  }

  /**
   * ### 声明一个配置项
   * * 仅声明，不设置默认值
   * @description
   * @author Big Mogician
   * @template T
   * @param {token: ConfigToken<T>} token
   * @returns {BonbonsServer}
   * @memberof BonbonsServer
   */
  public option<T>(token: ConfigToken<T>): this;
  /**
   * ### 注入一个配置项
   * * 需要设置默认值
   * @description
   * @author Big Mogician
   * @template T
   * @param {ConfigToken<T>} token
   * @param {Partial<T>} value
   * @returns {BonbonsServer}
   * @memberof BonbonsServer
   */
  public option<T>(token: ConfigToken<T>, value: Partial<T>): this;
  public option(...args: any[]): this {
    const [e1, e2] = args;
    if (!e1) {
      throw new Error(
        "DI token or entry is empty, you shouldn't call BonbonsServer.use<T>(...) without any param."
      );
    }
    this.configs.set(e1, optionAssign(this.configs, e1, e2 || {}));
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
  public scoped<TToken, TImplement>(
    token: AbstractType<TToken>,
    srv: ImplementType<TImplement>
  ): this;
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
   * @param {(context: FactoryContext) => TImplement} srv
   * @returns {BonbonsServer}
   * @memberof BonbonsServer
   */
  public scoped<TToken, TImplement>(
    token: AbstractType<TToken>,
    srv: (context: FactoryContext) => TImplement
  ): this;
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
  public scoped<TToken, TImplement>(
    token: AbstractType<TToken>,
    srv: TImplement
  ): this;
  public scoped(...args: any[]): this {
    return this.preInject(InjectScope.Scope, <any>args);
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
  public singleton<TToken, TImplement>(
    token: AbstractType<TToken>,
    srv: ImplementType<TImplement>
  ): this;
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
   * @param {(context: FactoryContext) => TImplement} srv
   * @returns {BonbonsServer}
   * @memberof BonbonsServer
   */
  public singleton<TToken, TImplement>(
    token: AbstractType<TToken>,
    srv: (context: FactoryContext) => TImplement
  ): this;
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
  public singleton<TToken, TImplement>(
    token: AbstractType<TToken>,
    srv: TImplement
  ): this;
  public singleton(...args: any[]): this {
    return this.preInject(InjectScope.Singleton, <any>args);
  }

  public unique<TInject>(srv: Constructor<TInject>): this;
  public unique<TToken, TImplement>(
    token: AbstractType<TToken>,
    srv: ImplementType<TImplement>
  ): this;
  public unique<TToken, TImplement>(
    token: AbstractType<TToken>,
    srv: (context: FactoryContext) => TImplement
  ): this;
  public unique<TToken, TImplement>(
    token: AbstractType<TToken>,
    srv: TImplement
  ): this;
  public unique(...args: any[]): this {
    return this.preInject(InjectScope.New, <any>args);
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
  public run(
    events?: Partial<{
      onStart: (app) => void;
      onError: (error, ctx) => void;
    }>
  ) {
    this.init();
    this.finalInjectionsInit();
    this.startApp(events);
  }

  //#region 支持继承树覆写和扩展

  /**
   * ## 处理合并与接受configs配置
   *
   * @author Big Mogician
   * @protected
   * @param {any} [configs={}] app.configs
   * @memberof Server
   */
  protected readConfigs(configs: any = {}) {
    this.configs.toArray().forEach(({ token }) => {
      const key = token.key.toString();
      if (/Symbol\(config::(.+)\)$/.test(key)) {
        this.option(token, configs[RegExp.$1] || {});
      }
    });
  }

  /**
   * ## 处理运行时参数
   *
   * @author Big Mogician
   * @protected
   * @template A extends Koa
   * @param {Koa} app
   * @memberof Server
   */
  protected readRuntimeEnv<A extends Koa>(app: A) {
    this.option(ENV, { env: app.env || "development" });
  }

  /**
   * ## 按照配置设置DI的解析方式
   * - `native` : 原生模式，最高的还原度，没有黑盒
   * - `proxy` : Proxy代理模式，追求更高性能的惰性解析
   * @description
   * @author Big Mogician
   * @protected
   * @memberof Server
   */
  protected resetDIResolver() {
    const { diType } = this.configs.get(ENV);
    this.di.resetConfigs({ type: diType });
  }

  /**
   * ## 解析Bundles
   *
   * @author Big Mogician
   * @protected
   * @memberof Server
   */
  protected resolveBundles() {
    _innerBundle["@singletons"].forEach(args => this.singleton(...args));
    _innerBundle["@scopeds"].forEach(args => this.scoped(...args));
    _innerBundle["@uniques"].forEach(args => this.unique(...args));
    _innerBundle["@options"].forEach(args => this.option(...args));
  }

  /**
   * ## 完成DI容器初始化并锁定
   * @description
   * @author Big Mogician
   * @protected
   * @memberof Server
   */
  protected resolveInjections() {
    this.preSingletons.forEach(([token, srv]) =>
      this.sendInjection(token, srv, InjectScope.Singleton)
    );
    this.preScopeds.forEach(([token, srv]) =>
      this.sendInjection(token, srv, InjectScope.Scope)
    );
    this.preUniques.forEach(([token, srv]) =>
      this.sendInjection(token, srv, InjectScope.New)
    );
    this.di.complete();
  }

  //#endregion

  private preInit() {
    this.initOptions();
    this.initInjections();
  }

  private init() {
    this.initRouters();
  }

  private initOptions() {
    this.option(ENV, defaultEnv);
    this.option(CONFIG_VIEW, defaultView);
    this.option(JSON_RESULT_OPTIONS, defaultJsonResultOptions);
    this.option(RENDER_RESULT_OPTIONS, defaultRenderResultOptions);
    this.option(STATIC_RESOLVER, TypedSerializer);
    this.option(ROUTER_OPTIONS, defaultRouterOptions);
    this.option(NUNJUNKS_OPTIONS, defaultNunjunksOptions);
    this.option(SIMPLE_LOGGER_OPTIONS, defaultSimpleLoggerOptions);
    this.option(GLOBAL_ERROR, defaultGlobalError);
  }

  private initInjections() {
    // 不允许装饰器复写
    this.scoped(AstroboyContext);
    this.scoped(Scope);
    this.singleton(SimpleLogger);
    // 允许被装饰器复写
    this.directInject(InjectScope.Scope, [NunjunksEngine]);
    this.directInject(InjectScope.Scope, [Render]);
  }

  private initRouters() {
    initRouters(<InnerRouterOptions>this.configs.get(ROUTER_OPTIONS));
    return this;
  }

  private finalInjectionsInit() {
    this.initConfigCollection();
    this.initInjectService();
    this.initContextProvider();
  }

  private startApp(
    events?: Partial<{
      onStart: (app) => void;
      onError: (error, ctx) => void;
    }>
  ) {
    const { onStart = undefined, onError = undefined } = events || {};
    new (this.appBuilder || Astroboy)(this.appConfigs || {})
      .on("start", (app: Koa) => {
        this.readConfigs(app["config"]);
        this.readRuntimeEnv(app);
        this.resetDIResolver();
        this.resolveBundles();
        this.resolveInjections();
        onStart && onStart(app);
      })
      .on("error", (error, ctx) => {
        onError && onError(error, ctx);
      });
  }

  /** 预注册，会覆盖装饰器的定义注册 */
  private preInject(type: InjectScope, service: Constructor<any>): this;
  private preInject(
    type: InjectScope,
    token_implement: [Constructor<any>, any]
  ): this;
  private preInject(type: InjectScope, p: any | [any, any]) {
    const args = p instanceof Array ? p : [p, p];
    switch (type) {
      case InjectScope.Scope:
        this.preScopeds.push([args[0], args[1] || args[0]]);
        break;
      case InjectScope.Singleton:
        this.preSingletons.push([args[0], args[1] || args[0]]);
        break;
      default:
        this.preUniques.push([args[0], args[1] || args[0]]);
        break;
    }
    return this;
  }

  /** 直接注册，允许`@Injectable()`装饰器之后进行定义复写 */
  private directInject(type: InjectScope, service: [Constructor<any>]): this;
  private directInject(
    type: InjectScope,
    token_implement: [Constructor<any>, any]
  ): this;
  private directInject(type: InjectScope, args: [any] | [any, any]) {
    switch (type) {
      case InjectScope.Scope:
        this.sendInjection(args[0], args[1] || args[0], InjectScope.Scope);
        break;
      case InjectScope.Singleton:
        this.sendInjection(args[0], args[1] || args[0], InjectScope.Singleton);
        break;
      default:
        this.sendInjection(args[0], args[1] || args[0], InjectScope.New);
        break;
    }
    return this;
  }

  /**
   * DI项最终注册登记
   *
   * @author Big Mogician
   * @private
   * @param {any} token
   * @param {any} inject
   * @param {InjectScope} scope
   * @returns
   * @memberof Server
   */
  private sendInjection(token: any, inject: any, scope: InjectScope) {
    if (!DIContainer.isFactory(inject)) {
      return this.di.register(token, inject, scope);
    }
    // 底层服务，直接使用底层工厂函数
    if (token === InjectService || token === Configs || token === Context) {
      return this.di.register(token, inject, scope);
    }
    return this.di.register(
      token,
      (scopeId, metadata) => {
        const injector = this.di.get(InjectService, scopeId);
        const configs = this.di.get(Configs, scopeId);
        return inject({ injector, configs });
      },
      scope
    );
  }

  /**
   * ## 初始化上下文服务
   * @description
   * @author Big Mogician
   * @private
   * @memberof Server
   */
  private initContextProvider() {
    this.scoped(Context, (scopeId?: ScopeID, { ctx = null } = {}) => {
      if (ctx === null) {
        throw new Error(
          "invalid call, you can only call a context in request pipe scope."
        );
      }
      return new Context(ctx);
    });
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
    this.scoped(InjectService, (scopeId?: ScopeID) => ({
      get: (token: InjectToken<any>) => this.di.get(token, scopeId),
      INTERNAL_dispose: () => this.di.dispose(scopeId),
      scopeId
    }));
  }

  /**
   * ## 注入全局配置容器服务
   * @description
   * @author Big Mogician
   * @private
   * @memberof Server
   */
  private initConfigCollection() {
    this.singleton(Configs, () => ({
      get: this.configs.get.bind(this.configs)
    }));
  }
}

type ServerBundle = PartReset<Server, { run: any }>;
type InnerBundle = ServerBundle & {
  "@options": [any, any?][];
  "@singletons": [Constructor<any>, any?][];
  "@scopeds": [Constructor<any>, any?][];
  "@uniques": [Constructor<any>, any?][];
};
/**
 * ## DI Bundles
 * * 导入并移动使用DI容器的注册api
 * * 和普通注入项解析方式相同
 */
export const Bundles: ChangeReturn<ServerBundle, ServerBundle> = {
  option(...args: any[]): ServerBundle {
    Bundles["@options"].push(args);
    return Bundles as any;
  },
  scoped(...args: any[]): ServerBundle {
    Bundles["@scopeds"].push(args);
    return Bundles as any;
  },
  singleton(...args: any[]): ServerBundle {
    Bundles["@singletons"].push(args);
    return Bundles as any;
  },
  unique(...args: any[]): ServerBundle {
    Bundles["@uniques"].push(args);
    return Bundles as any;
  },
  "@options": [],
  "@singletons": [],
  "@scopeds": [],
  "@uniques": []
} as any;
const _innerBundle: InnerBundle = Bundles as any;
