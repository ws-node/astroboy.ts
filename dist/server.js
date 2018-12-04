"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const astroboy_1 = tslib_1.__importDefault(require("astroboy"));
const Context_1 = require("./services/Context");
const Injector_1 = require("./services/Injector");
const AstroboyContext_1 = require("./services/AstroboyContext");
const Scope_1 = require("./services/Scope");
const utils_1 = require("./utils");
const di_1 = require("@bonbons/di");
const configs_1 = require("./configs");
const Configs_1 = require("./services/Configs");
/**
 * ## astroboy.ts服务
 * @description
 * @author Big Mogician
 * @export
 * @class Server
 */
class Server {
    constructor(...args) {
        this.di = utils_1.GlobalDI;
        this.configs = new Configs_1.RealConfigCollection();
        this.preSingletons = [];
        this.preScopeds = [];
        const [ctor, configs] = args;
        if (!ctor) {
            this.appBuilder = astroboy_1.default;
        }
        else if (ctor.prototype === undefined) {
            this.appBuilder = astroboy_1.default;
            this.appConfigs = ctor;
        }
        else {
            this.appBuilder = ctor;
            this.appConfigs = configs;
        }
        this.init();
    }
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
        this.finalInjectionsInit();
        this.startApp(events);
    }
    init() {
        this.initOptions();
        this.initInjections();
    }
    initOptions() {
        this.option(configs_1.ENV, configs_1.defaultEnv);
        this.option(configs_1.JSON_RESULT_OPTIONS, configs_1.defaultJsonResultOptions);
    }
    initInjections() {
        this.scoped(AstroboyContext_1.AstroboyContext);
        this.scoped(Scope_1.Scope);
    }
    finalInjectionsInit() {
        this.initConfigCollection();
        this.initInjectService();
        this.initContextProvider();
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
        new (this.appBuilder || astroboy_1.default)(this.appConfigs || {}).on("start", (app) => {
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