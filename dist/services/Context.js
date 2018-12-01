"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ## 基础上下文服务
 * @description
 * @author Big Mogician
 * @export
 * @class Context
 * @template T
 */
class Context {
    constructor(_ctx) {
        this._ctx = _ctx;
    }
    /**
     * ### Koa上下文对象
     * * 有可能被astroboy和后续框架扩展
     * @description
     * @readonly
     * @type {(KIContext & T)} 聚合类型
     * @memberof Context
     */
    get ctx() { return this._ctx; }
}
exports.Context = Context;
//# sourceMappingURL=Context.js.map