"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Injector_1 = require("../services/Injector");
const Configs_1 = require("../services/Configs");
const utils_1 = require("../utils");
/**
 * 创建具有依赖注入能力的中间件
 *
 * @author Big Mogician
 * @export
 * @template T extends IContext
 * @param {((bunddle: IMiddlewaresScope, ctx: T, next: () => Promise<void>) => void | Promise<void>)} middleware
 * @returns
 */
function createMiddleware(middleware) {
    return (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const scopeId = utils_1.getScopeId(ctx);
        const configs = utils_1.GlobalDI.get(Configs_1.Configs, scopeId);
        const injector = utils_1.GlobalDI.get(Injector_1.InjectService, scopeId);
        yield middleware({ injector, configs, ctx, next });
    });
}
exports.createMiddleware = createMiddleware;
//# sourceMappingURL=core.js.map