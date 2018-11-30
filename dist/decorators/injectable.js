"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
const inject_server_1 = require("../inject-server");
function Injectable(config) {
    return function (target) {
        const { token = undefined, type = di_1.InjectScope.Scope } = config || {};
        const prototype = target.prototype;
        prototype.__valid = true;
        const DYNAMIC_SERVICE = class {
            constructor() {
                const data = inject_server_1.GlobalServiceMeta.get(token || DYNAMIC_SERVICE) || {};
                Object.keys(data).forEach(k => this[k] = data[k]);
            }
        };
        Object.defineProperty(DYNAMIC_SERVICE, "name", { value: target.name });
        Object.getOwnPropertyNames(prototype).forEach(name => {
            Object.defineProperty(DYNAMIC_SERVICE.prototype, name, Object.getOwnPropertyDescriptor(prototype, name));
        });
        // @ts-ignore
        DYNAMIC_SERVICE.prototype.__proto__ = target.prototype.__proto__;
        inject_server_1.GlobalSourceDI.register(token || DYNAMIC_SERVICE, target, di_1.InjectScope.Singleton);
        inject_server_1.GlobalDI.register(token || DYNAMIC_SERVICE, DYNAMIC_SERVICE, type);
        return DYNAMIC_SERVICE;
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.js.map