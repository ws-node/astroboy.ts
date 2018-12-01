"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
const utils_1 = require("../utils");
/**
 * ## 定义服务
 * @description
 * @author Big Mogician
 * @export
 * @param {Partial<{
 *   type: InjectScope,
 *   token: InjectToken
 * }>} [config]
 * @returns
 */
function Injectable(config) {
    return function (target) {
        const { token = undefined, type = di_1.InjectScope.Scope } = config || {};
        const prototype = target.prototype;
        prototype.__valid = true;
        utils_1.GlobalDI.register(token || target, target, type);
        return target;
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.js.map