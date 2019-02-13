"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
const utils_1 = require("../utils");
function Injectable(config) {
    return function (target) {
        let token = undefined;
        let scope = di_1.InjectScope.Scope;
        switch (config) {
            case di_1.InjectScope.Scope:
            case di_1.InjectScope.Singleton:
            case di_1.InjectScope.New:
                scope = config;
                break;
            default:
                const { token: tk = undefined, type: tp = di_1.InjectScope.Scope } = config || {};
                scope = tp || di_1.InjectScope.Scope;
                token = tk;
        }
        const prototype = target.prototype;
        prototype.__valid = true;
        utils_1.GlobalDI.register(token || target, target, scope);
        return (target);
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.js.map