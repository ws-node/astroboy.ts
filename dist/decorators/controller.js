"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
const astroboy_router_1 = require("astroboy-router");
const inject_server_1 = require("../inject-server");
function resolveDepts(target, ctx) {
    return inject_server_1.GlobalDI.getDepedencies(di_1.getDependencies(target) || [], ctx.state["$$scopeId"]);
}
function createInstance(target, ctx) {
    return new target(...(inject_server_1.GlobalDI.getDepedencies(di_1.getDependencies(target) || [], ctx.state["$$scopeId"])));
}
function Controller(prefix) {
    return function (target) {
        const prototype = target.prototype;
        prototype.__valid = true;
        const DI_CONTROLLER = class {
            constructor(ctx) {
                return createInstance(target, ctx);
            }
        };
        Object.getOwnPropertyNames(prototype).forEach(name => {
            Object.defineProperty(DI_CONTROLLER.prototype, name, Object.getOwnPropertyDescriptor(prototype, name));
        });
        // @ts-ignore
        DI_CONTROLLER.prototype.__proto__ = target.prototype.__proto__;
        astroboy_router_1.Router(prefix)(target);
        inject_server_1.GlobalImplements.set(DI_CONTROLLER, target);
        return DI_CONTROLLER;
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map