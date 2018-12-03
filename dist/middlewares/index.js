"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const Injector_1 = require("../services/Injector");
const configs_1 = require("../configs");
const Configs_1 = require("../services/Configs");
const Scope_1 = require("../services/Scope");
/**
 * 创建具有依赖注入能力的中间件
 * @description
 * @author Big Mogician
 * @export
 * @template T extends IContext
 * @param {((bunddle: IMiddlewaresScope, ctx: T, next: () => Promise<void>) => void | Promise<void>)} middleware
 * @param {...any[]} args
 * @returns
 */
function createMiddleware(middleware, ...args) {
    return (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const scopeId = utils_1.getScopeId(ctx);
        const configs = utils_1.GlobalDI.get(Configs_1.Configs, scopeId);
        yield middleware({
            injector: ({
                get: (token) => utils_1.GlobalDI.get(token, scopeId),
                INTERNAL_dispose: () => utils_1.GlobalDI.dispose(scopeId),
                scopeId
            }),
            configs,
            args,
            ctx,
            next
        });
    });
}
exports.injectScope = createMiddleware;
/**
 * ## astroboy.ts初始化中间件
 * * 请确保此中间件的优先级足够高
 * * 建议优先级<1
 * @param ctx IContext
 * @param next 下一个中间件
 */
exports.serverInit = (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const scopeId = utils_1.setScopeId(ctx);
    utils_1.GlobalDI.createScope(scopeId, { ctx });
    const injector = utils_1.GlobalDI.get(Injector_1.InjectService, scopeId);
    const { showTrace } = injector.get(Configs_1.Configs).get(configs_1.ENV);
    if (showTrace) {
        const scope = injector.get(Scope_1.Scope);
        scope.init(scopeId).begin();
        console.log(`${utils_1.setColor("blue", "[astroboy.ts]")} : scope ${utils_1.setColor("cyan", utils_1.getShortScopeId(scopeId))} is init.`);
    }
    try {
        yield next();
    }
    finally {
        if (showTrace) {
            const scope = injector.get(Scope_1.Scope);
            scope.end();
            const duration = scope.diration();
            console.log(`${utils_1.setColor("blue", "[astroboy.ts]")} : scope ${utils_1.setColor("cyan", utils_1.getShortScopeId(injector.scopeId))} is [${utils_1.setColor(duration > 500 ? "red" : duration > 200 ? "yellow" : "green", duration)} ms] disposed.`);
        }
        injector["INTERNAL_dispose"] && injector["INTERNAL_dispose"]();
    }
});
//# sourceMappingURL=index.js.map