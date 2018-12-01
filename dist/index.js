"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./decorators/injectable"));
__export(require("./decorators/controller"));
__export(require("./middlewares"));
__export(require("./services/Context"));
__export(require("./services/Injector"));
__export(require("./services/Configs"));
__export(require("./services/BaseClass"));
__export(require("./services/AstroboyContext"));
__export(require("./server"));
__export(require("./configs"));
__export(require("astroboy-router"));
const astroboy_router_1 = require("astroboy-router");
const utils_1 = require("./utils");
/**
 * ## 构建路由
 * * 等效astroboy-router的createRouter方法
 * @description
 * @author Big Mogician
 * @export
 * @template T
 * @param {ControllerConstructor<T>} ctor
 * @param {string} name
 * @param {string} root
 * @returns
 */
function buildRouter(ctor, name, root) {
    return astroboy_router_1.createRouter(utils_1.GlobalImplements.get(ctor), name, root);
}
exports.buildRouter = buildRouter;
//# sourceMappingURL=index.js.map