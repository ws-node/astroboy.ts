"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const astroboy_1 = tslib_1.__importDefault(require("astroboy"));
exports.Astroboy = astroboy_1.default;
const astroboy_router_1 = require("astroboy-router");
const utils_1 = require("./utils");
const controller_1 = require("./decorators/controller");
const builders_1 = require("./builders");
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
    const sourceCtor = utils_1.GlobalImplements.get(ctor);
    const result = astroboy_router_1.createRouter(sourceCtor, name, root);
    controller_1.copyPrototype(ctor, sourceCtor);
    return result;
}
exports.buildRouter = buildRouter;
/**
 * ## astroboy.ts 预处理函数
 * * 硬核初始化routers
 * @description
 * @author Big Mogician
 * @export
 * @param {Partial<IPreProcess>} {
 *   routerAutoBuild: open = defaultEnv.routerAutoBuild,
 *   routerAlwaysBuild: always = defaultEnv.routerAlwaysBuild,
 *   routerRoot: root = defaultEnv.routerRoot
 * }
 */
function preInitFn(configs) {
    return builders_1.initRouters(configs);
}
exports.preInitFn = preInitFn;
tslib_1.__exportStar(require("astroboy-router"), exports);
tslib_1.__exportStar(require("./decorators"), exports);
tslib_1.__exportStar(require("./middlewares"), exports);
tslib_1.__exportStar(require("./services/Injector"), exports);
tslib_1.__exportStar(require("./services/Context"), exports);
tslib_1.__exportStar(require("./services/BaseClass"), exports);
tslib_1.__exportStar(require("./services/AstroboyContext"), exports);
tslib_1.__exportStar(require("./server"), exports);
tslib_1.__exportStar(require("./configs"), exports);
tslib_1.__exportStar(require("./results/json"), exports);
tslib_1.__exportStar(require("./plugins/typed-serializer"), exports);
var Configs_1 = require("./services/Configs");
exports.Configs = Configs_1.Configs;
exports.createOptions = Configs_1.createOptions;
exports.createConfig = Configs_1.createConfig;
exports.InjectScope = Configs_1.InjectScope;
//# sourceMappingURL=index.js.map