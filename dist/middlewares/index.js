"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const Injector_1 = require("../services/Injector");
const configs_1 = require("../configs");
const Configs_1 = require("../services/Configs");
const Scope_1 = require("../services/Scope");
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
    yield next();
});
//# sourceMappingURL=index.js.map