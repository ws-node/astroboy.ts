"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
const inject_server_1 = require("../inject-server");
function Injectable(config) {
    return function (target) {
        const { token = undefined, type = di_1.InjectScope.Scope } = config || {};
        const prototype = target.prototype;
        prototype.__valid = true;
        const implement = class {
            constructor(ctx) {
                const data = inject_server_1.GlobalServiceMeta.get(token || implement) || {};
                Object.keys(data).forEach(k => this[k] = data[k]);
            }
        };
        Object.defineProperty(implement, "name", { value: target.name });
        Object.getOwnPropertyNames(target.prototype).forEach(name => {
            Object.defineProperty(implement.prototype, name, Object.getOwnPropertyDescriptor(target.prototype, name));
        });
        // @ts-ignore
        implement.prototype.__proto__ = target.prototype.__proto__;
        inject_server_1.GlobalSourceDI.register(token || implement, target, di_1.InjectScope.Singleton);
        inject_server_1.GlobalDI.register(token || implement, implement, type);
        return implement;
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.js.map