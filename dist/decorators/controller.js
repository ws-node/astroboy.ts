"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const astroboy_router_1 = require("astroboy-router");
const utils_1 = require("../utils");
const Context_1 = require("../services/Context");
const Configs_1 = require("../services/Configs");
const route_1 = require("./route");
const typed_serialize_options_1 = require("../configs/typed-serialize.options");
const INTERNAL_INJECTOR = "$INTERNAL_INJECTOR";
const $$injector = "$$injector";
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
                controller[INTERNAL_INJECTOR] = injector;
                return controller;
            }
        };
        Object.defineProperty(prototype, $$injector, {
            get() { return this[INTERNAL_INJECTOR]; },
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
                const { params: routeParams } = route_1.tryGetRouteMagic(prototype, name);
                descriptor.value = function () {
                    return tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const injector = this[$$injector];
                        const { ctx } = injector.get(Context_1.Context);
                        const staticResolver = injector.get(Configs_1.Configs).get(typed_serialize_options_1.STATIC_RESOLVER);
                        const params = resolveRouteMethodParams(routeParams, ctx, staticResolver);
                        const result = yield value.bind(this)(...params);
                        if (result)
                            resolveMethodResult(result, ctx, injector);
                    });
                };
                Object.defineProperty(prototype, name, descriptor);
            }
        });
        copyPrototype(DI_CONTROLLER, target);
        utils_1.GlobalImplements.set(DI_CONTROLLER, target);
        return DI_CONTROLLER;
    };
}
exports.Controller = Controller;
function copyPrototype(DI_CONTROLLER, target) {
    Object.getOwnPropertyNames(target.prototype).forEach(name => {
        Object.defineProperty(DI_CONTROLLER.prototype, name, Object.getOwnPropertyDescriptor(target.prototype, name));
    });
    // @ts-ignore
    DI_CONTROLLER.prototype.__proto__ = target.prototype.__proto__;
    // @ts-ignore
    DI_CONTROLLER.__proto__ = target.__proto__;
}
exports.copyPrototype = copyPrototype;
function resolveRouteMethodParams(routeParams, ctx, staticResolver) {
    const params = [];
    routeParams.forEach(i => {
        const { index, type, resolver, ctor, static: stac } = i;
        let final;
        if (type === "body") {
            const v = !resolver ?
                ctx.request.body :
                resolver(ctx.request.body || {});
            final = resolveStaticType(stac, ctor, v, staticResolver);
        }
        else {
            const v = !resolver ? Object.assign({}, ctx.query, ctx.params) :
                resolver(Object.assign({}, ctx.query, ctx.params));
            final = resolveStaticType(stac, ctor, v, staticResolver);
        }
        params[index] = final;
    });
    return params;
}
function resolveStaticType(stac, ctor, value, staticResolver) {
    return !ctor || (stac === false) ?
        (value || {}) :
        typeTransform(staticResolver, value, ctor);
}
function typeTransform(staticResolver, value, ctor) {
    switch (ctor) {
        case Number:
        case String: return ctor(value);
        case Boolean: return String(value || "") === "true";
        case Object: return value || {};
        default: return staticResolver.FromObject(value || {}, ctor);
    }
}
function resolveMethodResult(result, ctx, injector) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (result.toResult) {
            ctx.body = yield result.toResult({ injector, configs: injector.get(Configs_1.Configs) });
        }
        else {
            ctx.body = result;
        }
    });
}
//# sourceMappingURL=controller.js.map