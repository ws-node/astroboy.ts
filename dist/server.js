"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
const Context_1 = require("./services/Context");
const Injector_1 = require("./services/Injector");
const Configs_1 = require("./services/Configs");
const utils_1 = require("./utils");
const configs_1 = require("./configs");
const AstroboyContext_1 = require("./services/AstroboyContext");
const Scope_1 = require("./services/Scope");
/**
 * ## astroboy.ts服务
 * @description
 * @author Big Mogician
 * @export
 * @class Server
 */
class Server {
    constructor(appBuilder, appConfigs) {
        this.appBuilder = appBuilder;
        this.appConfigs = appConfigs;
        this.di = utils_1.GlobalDI;
        this.configs = new Configs_1.ConfigCollection();
        this.preSingletons = [];
        this.preScopeds = [];
    }
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
    static Create(ctor, configs) {
        return new Server(ctor, configs);
    }
    option(...args) {
        const [e1, e2] = args;
        if (!e1) {
            throw new Error("DI token or entry is empty, you shouldn't call BonbonsServer.use<T>(...) without any param.");
        }
        if (!e2 || args.length === 2) {
            this.configs.set(e1, utils_1.optionAssign(this.configs, e1, e2));
        }
        else {
            const { token, value } = e1;
            this.configs.set(token, utils_1.optionAssign(this.configs, token, value));
        }
        return this;
    }
    scoped(...args) {
        this.preScopeds.push([args[0], args[1] || args[0]]);
        return this;
    }
    singleton(...args) {
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
    run(events) {
        this.initOptions();
        this.initInjections();
        this.startApp(events);
    }
    initOptions() {
        this.option(configs_1.ENV, configs_1.defaultEnv);
    }
    initInjections() {
        this.initConfigCollection();
        this.initInjectService();
        this.initContextProvider();
        this.scoped(AstroboyContext_1.AstroboyContext);
        this.scoped(Scope_1.Scope);
    }
    readConfigs(configs = {}) {
        this.configs.toArray().forEach(({ token }) => {
            const key = token.key.toString();
            if (/Symbol\(config::(.+)\)$/.test(key)) {
                this.option(token, configs[RegExp.$1] || {});
            }
        });
    }
    startApp(events) {
        const { onStart = undefined, onError = undefined } = events || {};
        new this.appBuilder(this.appConfigs || {}).on("start", (app) => {
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
    resetDIResolver() {
        const { diType } = this.configs.get(configs_1.ENV);
        this.di.resetConfigs({ type: diType });
    }
    /**
     * ## 完成DI容器初始化并锁定
     * @description
     * @author Big Mogician
     * @private
     * @memberof Server
     */
    resolveInjections() {
        this.preSingletons.forEach(([token, srv]) => this.di.register(token, srv, di_1.InjectScope.Singleton));
        this.preScopeds.forEach(([token, srv]) => this.di.register(token, srv, di_1.InjectScope.Scope));
        this.di.complete();
    }
    /**
     * ## 初始化上下文服务
     * @description
     * @author Big Mogician
     * @private
     * @memberof Server
     */
    initContextProvider() {
        this.scoped(Context_1.Context, (scopeId, { ctx = null } = {}) => {
            if (ctx === null)
                throw new Error("invalid call, you can only call a context in request pipe scope.");
            return new Context_1.Context(ctx);
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
    initInjectService() {
        this.scoped(Injector_1.InjectService, (scopeId) => ({
            get: (token) => this.di.get(token, scopeId),
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
    initConfigCollection() {
        this.singleton(Configs_1.Configs, () => ({ get: this.configs.get.bind(this.configs) }));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map