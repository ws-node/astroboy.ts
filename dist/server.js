"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
const Context_1 = require("./services/Context");
const Injector_1 = require("./services/Injector");
const Configs_1 = require("./services/Configs");
const utils_1 = require("./utils");
const configs_1 = require("./configs");
const AstroboyContext_1 = require("./services/AstroboyContext");
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
    /**
     * ### 启动app
     * @description
     * @author Big Mogician
     * @param {() => void} [onStart] on('start') 回调
     * @memberof Server
     */
    run(onStart) {
        this.initOptions();
        this.initInjections();
        this.startApp(onStart);
    }
    initOptions() {
    }
    initInjections() {
        this.initConfigCollection();
        this.initInjectService();
        this.initContextProvider();
        this.di.register(AstroboyContext_1.AstroboyContext, AstroboyContext_1.AstroboyContext, di_1.InjectScope.Scope);
    }
    startApp(onStart) {
        new this.appBuilder(this.appConfigs || {}).on("start", (app) => {
            this.option(configs_1.ENV, { mode: app["NODE_ENV"] });
            this.option(configs_1.AST_BASE, { app, config: app["config"] || {} });
            this.di.complete();
            onStart && onStart();
        }).on("error", (_, ctx) => {
            this.di.dispose(utils_1.getScopeId(ctx));
            const { mode } = this.configs.get(configs_1.ENV);
            if (mode !== "production" && mode !== "prod") {
                console.log(`${utils_1.setColor("blue", "[astroboy.ts]")} : scope ${utils_1.setColor("cyan", utils_1.getScopeId(ctx, true))} is disposed (global error handler).`);
            }
        });
    }
    initContextProvider() {
        this.di.register(Context_1.Context, (scopeId, { ctx = null } = {}) => {
            if (ctx === null)
                throw new Error("invalid call, you can only call a context in request pipe scope.");
            return new Context_1.Context(ctx);
        }, di_1.InjectScope.Scope);
    }
    initInjectService() {
        this.di.register(Injector_1.InjectService, (scopeId) => ({
            get: (token) => this.di.get(token, scopeId),
            INTERNAL_dispose: () => this.di.dispose(scopeId),
            scopeId
        }), di_1.InjectScope.Scope);
    }
    initConfigCollection() {
        this.di.register(Configs_1.Configs, () => ({ get: this.configs.get.bind(this.configs) }), di_1.InjectScope.Singleton);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map