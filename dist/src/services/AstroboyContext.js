"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const injectable_1 = require("../decorators/injectable");
const Context_1 = require("./Context");
/**
 * ## Astroboy.ts基础上下文服务
 * * `ctx` 承载Koa.Context，可定制类型
 * * `app` 承载Koa.Application，可定制类型
 * * `config` 承载业务config，可定制类型
 * @description
 * @author Big Mogician
 * @export
 * @class AstroboyContext
 * @template T typeof `ctx` 类型
 * @template A typeof `app` 类型
 * @template C typeof `config` 类型
 */
let AstroboyContext = class AstroboyContext {
    constructor(context) {
        this.context = context;
    }
    /** BaseClass.ctx */
    get ctx() { return this.context.ctx || {}; }
    /** BaseClass.app */
    get app() { return (this.ctx && this.ctx.app) || {}; }
    /** BaseClass.config */
    get config() { return (this.app && this.app["config"]) || {}; }
    getConfig(...args) {
        // @ts-ignore 参数定义override忽略
        return this.ctx.getConfig(...args);
    }
    getServiceClass(...args) {
        // @ts-ignore 参数定义override忽略
        return this.ctx.getServiceClass(...args);
    }
    getService(...args) {
        // @ts-ignore 参数定义override忽略
        return this.ctx.getService(...args);
    }
    callService(...args) {
        // @ts-ignore 参数定义override忽略
        return this.ctx.callService(...args);
    }
    invokeServiceMethod(...args) {
        // @ts-ignore 参数定义override忽略
        return this.ctx.invokeServiceMethod(...args);
    }
    getLib(...args) {
        // @ts-ignore 参数定义override忽略
        return this.ctx.getLib(...args);
    }
};
AstroboyContext = tslib_1.__decorate([
    injectable_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [Context_1.Context])
], AstroboyContext);
exports.AstroboyContext = AstroboyContext;
//# sourceMappingURL=AstroboyContext.js.map