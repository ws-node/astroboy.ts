"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const Injector_1 = require("../services/Injector");
const configs_1 = require("../configs");
const Configs_1 = require("../services/Configs");
/**
 * ## astroboy.ts初始化中间件
 * * 请确保此中间件的优先级足够高
 * * 建议优先级<1
 * @param ctx IContext
 * @param next 下一个中间件
 */
exports.serverInit = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const scopeId = utils_1.setScopeId(ctx);
    utils_1.GlobalDI.createScope(scopeId, { ctx });
    const injector = utils_1.GlobalDI.get(Injector_1.InjectService, scopeId);
    const { mode } = injector.get(Configs_1.Configs).get(configs_1.ENV);
    if (mode !== "production" && mode !== "prod") {
        console.log(`${utils_1.setColor("blue", "[astroboy.ts]")} : scope ${utils_1.setColor("cyan", utils_1.getShortScopeId(scopeId))} is init [${utils_1.setColor("green", new Date().getTime())}].`);
    }
    yield next();
});
//# sourceMappingURL=index.js.map