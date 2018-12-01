"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const astroboy_router_1 = require("astroboy-router");
const utils_1 = require("../utils");
const Configs_1 = require("../services/Configs");
const configs_1 = require("../configs");
/**
 * ## 定义控制器
 * * routes部分由astroboy-router实现
 * @description
 * @author Big Mogician
 * @export
 * @param {string} prefix
 * @returns
 */
function Controller(prefix) {
    return function (target) {
        const prototype = target.prototype;
        prototype.__valid = true;
        astroboy_router_1.Router(prefix)(target);
        const DI_CONTROLLER = class {
            constructor(ctx) {
                const injector = utils_1.getInjector(ctx);
                const controller = utils_1.createInstance(target, ctx);
                controller["$INTERNAL_INJECTOR"] = injector;
                return controller;
            }
        };
        Object.defineProperty(prototype, "$$injector", {
            get() { return this["$INTERNAL_INJECTOR"]; },
            configurable: false,
            enumerable: false
        });
        const { routes = {} } = prototype["@router"];
        Object.getOwnPropertyNames(prototype).forEach(name => {
            if (name === "@router")
                return;
            if (name === "constructor")
                return;
            const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
            const { value, get } = descriptor;
            if (get)
                return;
            if (name in routes && value && typeof value === "function") {
                descriptor.value = function () {
                    return tslib_1.__awaiter(this, void 0, void 0, function* () {
                        try {
                            yield value.bind(this)();
                        }
                        catch (e) {
                            throw e;
                        }
                        finally {
                            const injector = this["$$injector"];
                            if (!injector) {
                                console.log(utils_1.setColor("red", "[astroboy.ts] warning: $$injector is lost, memory weak."));
                                return;
                            }
                            injector["INTERNAL_dispose"] && injector["INTERNAL_dispose"]();
                            const { mode } = injector.get(Configs_1.Configs).get(configs_1.ENV);
                            if (mode !== "production" && mode !== "prod") {
                                console.log(`${utils_1.setColor("blue", "[astroboy.ts]")} : scope ${utils_1.setColor("cyan", utils_1.getShortScopeId(injector.scopeId))} is disposed [${utils_1.setColor("red", new Date().getTime())}].`);
                            }
                        }
                    });
                };
                Object.defineProperty(prototype, name, descriptor);
            }
        });
        Object.getOwnPropertyNames(prototype).forEach(name => {
            Object.defineProperty(DI_CONTROLLER.prototype, name, Object.getOwnPropertyDescriptor(prototype, name));
        });
        // @ts-ignore
        DI_CONTROLLER.prototype.__proto__ = target.prototype.__proto__;
        // @ts-ignore
        DI_CONTROLLER.__proto__ = target.__proto__;
        utils_1.GlobalImplements.set(DI_CONTROLLER, target);
        return DI_CONTROLLER;
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map