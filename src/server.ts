import Koa from "koa";
import { Constructor, InjectScope, ScopeID, InjectToken } from "@bonbons/di";
import { Context } from "./services/Context";
import { InjectService } from "./services/Injector";
import { ConfigCollection, ConfigEntry, ConfigToken, Configs } from "./services/Configs";
import { GlobalDI, optionAssign, getScopeId, setColor } from "./utils";
import { AST_BASE, ENV } from "./configs";
import { AstroboyContext } from "./services/AstroboyContext";

export class Server {

  private di = GlobalDI;
  private configs = new ConfigCollection();

  constructor(private appBuilder: Constructor<any>, private appConfigs?: any) { }

  public static Create(ctor: Constructor<any>, configs?: any) {
    return new Server(ctor, configs);
  }

  /**
   * Set an option
   * ---
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
   * Set an option
   * ---
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

  public run(onStart?: () => void) {
    this.initOptions();
    this.initInjections();
    this.startApp(onStart);
  }

  private initOptions() {

  }

  private initInjections() {
    this.initConfigCollection();
    this.initInjectService();
    this.initContextProvider();
    this.di.register(AstroboyContext, AstroboyContext, InjectScope.Scope);
  }

  private startApp(onStart: () => void) {
    new this.appBuilder(this.appConfigs || {}).on("start", (app: Koa) => {
      this.option(ENV, { mode: app["NODE_ENV"] });
      this.option(AST_BASE, { app, config: app["config"] || {} });
      this.di.complete();
      onStart && onStart();
    }).on("error", (_, ctx) => {
      this.di.dispose(getScopeId(ctx));
      const { mode } = this.configs.get(ENV);
      if (mode !== "production" && mode !== "prod") {
        console.log(`${
          setColor("blue", "[astroboy.ts]")
          } : scope ${
          setColor("cyan", getScopeId(ctx, true))
          } is disposed (global error handler).`
        );
      }
    });
  }

  private initContextProvider() {
    this.di.register(
      Context,
      (scopeId?: ScopeID, { ctx = null } = {}) => {
        if (ctx === null) throw new Error("invalid call, you can only call a context in request pipe scope.");
        return new Context(ctx);
      },
      InjectScope.Scope);
  }

  private initInjectService() {
    this.di.register(
      InjectService,
      (scopeId?: ScopeID) => ({
        get: (token: InjectToken) => this.di.get(token, scopeId),
        INTERNAL_dispose: () => this.di.dispose(scopeId),
        scopeId
      }),
      InjectScope.Scope);
  }

  private initConfigCollection() {
    this.di.register(
      Configs,
      () => ({ get: this.configs.get.bind(this.configs) }),
      InjectScope.Singleton);
  }

}
