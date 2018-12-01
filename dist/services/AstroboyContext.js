"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const injectable_1 = require("../decorators/injectable");
const Context_1 = require("./Context");
/**
 * ## Astroboy.ts基础上下文服务
 * * `ctx` 承载Koa.Context
 * * `app` 承载Koa.Application
 * * `config` 承载业务config
 * @description
 * @author Big Mogician
 * @export
 * @class AstroboyContext
 * @template T
 */
let AstroboyContext = class AstroboyContext {
    constructor(context) {
        this.context = context;
    }
    /** BaseClass.ctx */
    get ctx() { return this.context.ctx; }
    /** BaseClass.app */
    get app() { return this.ctx.app; }
    /** BaseClass.config */
    get config() { return this.app["config"] || {}; }
    getConfig(...args) {
        return this.ctx.getConfig(...args);
    }
    getServiceClass(...args) {
        return this.ctx.getServiceClass(...args);
    }
    getService(...args) {
        return this.ctx.getService(...args);
    }
    callService(...args) {
        // @ts-ignore
        return this.ctx.callService(...args);
    }
    invokeServiceMethod(...args) {
        // @ts-ignore
        return this.ctx.invokeServiceMethod(...args);
    }
    getLib(...args) {
        return this.ctx.getLib(...args);
    }
};
AstroboyContext = tslib_1.__decorate([
    injectable_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [Context_1.Context])
], AstroboyContext);
exports.AstroboyContext = AstroboyContext;
//# sourceMappingURL=AstroboyContext.js.map